import { clamp, interpolate, rand } from '@drivej/xrworld';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

const RAD = Math.PI / 180;

type Gear = {
  a: number;
  r: number;
  s: number;
  args: { radius: { min: number; max: number }; speed: { min: number; max: number } };
};

type Point = {
  x: number;
  y: number;
};

type Particle = {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  mass: number;
  isStatic?: boolean;
  width: number;
};

type Spring = {
  a: number; //
  b: number;
  restLength: number;
};

type GrassBlade = {
  windIndex: number; //
  grass: Particle[];
  springs: Spring[];
  color: string;
  ignoreMouse: boolean;
  cvs: OffscreenCanvas;
  ctx: OffscreenCanvasRenderingContext2D;
  dupes: Point[];
};

type Butterfly = {
  shouldFollow: boolean; //
  anchor: any;
  position: any;
  vector: any;
  flutter: Gear[];
  width: any;
  color: RGB;
  glowColor: RGB;
  depth?: number;
  glow: Gear[];
  glowRadius: number;
  targetX: number;
};

type RGB = {
  r: number; //
  b: number;
  g: number;
};

function randomSign() {
  return Math.random() < 0.5 ? -1 : 1;
}

export function randGear(radius: { min: number; max: number } = { min: 3, max: 8 }, speed: { min: number; max: number } = { min: 1, max: 10 }, angle: { min: number; max: number } = { min: 0, max: 360 }): Gear {
  return {
    a: rand(angle.min, angle.max) * RAD,
    r: rand(radius.min, radius.max),
    s: rand(speed.min, speed.max) * RAD * randomSign(), //0.3 + Math.random() * 30 * RAD
    args: { radius, speed }
  };
}

function getGearPosition(gears: Gear[], offset: number = 0, normalize = false) {
  let x = 0;
  let y = 0;
  let a = 0;

  for (let i = 0; i < gears.length; i++) {
    const gear = gears[i];
    a = gear.a + gear.s * offset;
    x += Math.sin(a) * gear.r;
    y += Math.cos(a) * gear.r;
  }
  return { x, y };
}

function advanceGears(gears: Gear[], steps = 1) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < gears.length; i++) {
    const gear = gears[i];
    gear.a += gear.s * steps;
    x += Math.sin(gear.a) * gear.r;
    y += Math.cos(gear.a) * gear.r;
  }
  return { x, y };
}

function getGearsRadius(gears: Gear[]) {
  let l = 0;
  for (let i = 0; i < gears.length; i++) {
    l += gears[i].r;
  }
  return l;
}

function solveDistanceConstraint(p1: Particle, p2: Particle, restLength: number) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;

  const error = dist - restLength;
  const nx = dx / dist;
  const ny = dy / dist;

  const w1 = 1 / p1.mass;
  const w2 = 1 / p2.mass;
  const wSum = w1 + w2;

  const correctionX = nx * error;
  const correctionY = ny * error;

  if (p1?.isStatic !== true) {
    p1.x += correctionX * (w1 / wSum);
    p1.y += correctionY * (w1 / wSum);
  }

  if (p2?.isStatic !== true) {
    p2.x -= correctionX * (w2 / wSum);
    p2.y -= correctionY * (w2 / wSum);
  }
}

function verletIntegrateDamped(p: Particle, ax: number, ay: number, dt: number, damping = 0.98) {
  const vx = (p.x - p.prevX) * damping;
  const vy = (p.y - p.prevY) * damping;
  const nextX = p.x + vx + ax * dt * dt;
  const nextY = p.y + vy + ay * dt * dt;
  p.prevX = p.x;
  p.prevY = p.y;
  if (p?.isStatic !== true) {
    p.x = nextX;
    p.y = nextY;
  }
}

function simulate(particles: Particle[], springs: Spring[], dt: number, gravityY = 5) {
  for (const p of particles) {
    verletIntegrateDamped(p, 0, gravityY, dt, 0.98);
  }

  for (let i = 0; i < 4; i++) {
    for (const s of springs) {
      solveDistanceConstraint(particles[s.a], particles[s.b], s.restLength);
    }
  }
}

function generateGrassBlade(width = 500, height = 100): GrassBlade {
  const widthOffset = rand(0.5, 1);
  const massOffset = rand(0.7, 3); // rand(0, 40);
  const restLengthOffset = rand(0.6, 1); //rand(0, 20);
  const x = rand(0, width);
  const color1 = [46, 189, 63];
  const color2 = [159, 139, 111];
  const r1 = 0.6;
  const r2 = 1;
  const c = Math.random() < 0.2 ? color2 : color1;
  const color = `rgb(${rand(c[0] * r1, c[0] * r2)}, ${rand(c[1] * r1, c[1] * r2)}, ${rand(c[2] * r1, c[2] * r2)})`;
  const bladeHeight = height * rand(0.4, 0.6);
  const y = bladeHeight;

  const grass: Particle[] = [
    { x, y, prevX: x, prevY: y, mass: 80 * massOffset, width: 5 * widthOffset, isStatic: true },
    { x, y, prevX: x, prevY: y, mass: 50 * rand(0.7, 3), width: 5 * widthOffset },
    { x, y, prevX: x, prevY: y, mass: 20 * rand(0.7, 3), width: 5 * widthOffset },
    { x, y, prevX: x, prevY: y, mass: 20 * rand(0.7, 3), width: 5 * widthOffset },
    { x, y, prevX: x, prevY: y, mass: 10 * rand(0.7, 3), width: 4 * widthOffset },
    { x, y, prevX: x, prevY: y, mass: 10 * rand(0.7, 3), width: 3 * widthOffset },
    { x, y, prevX: x, prevY: y, mass: 30 * rand(0.7, 3), width: 1 }
  ];
  const springs = grass.slice(0, -1).map((g, i) => ({
    a: i,
    b: i + 1,
    restLength: (bladeHeight / grass.length) * restLengthOffset
  }));
  const cvs = new OffscreenCanvas(width, height);
  const ctx = cvs.getContext('2d');
  return {
    grass,
    springs,
    color,
    ignoreMouse: Math.random() < 0.1,
    cvs,
    ctx, //
    dupes: Array.from({ length: rand(10, 20, true) }).map(() => ({ x: x + rand(-100, 100), y: rand(0, 100) })),
    windIndex: rand(0, 1, true)
  };
}

function generateButterfly(width: number): Butterfly {
  const glow = Array.from({ length: rand(2, 3, true) }).map(() => randGear({ min: 200, max: 400 }, { min: -0.5, max: 0.5 }));
  return {
    anchor: { x: rand(0, 2000), y: rand(1000, 1000) }, //
    position: { x: rand(0, 2000), y: rand(1000, 1000) },
    vector: { x: 0, y: 0 },
    flutter: Array.from({ length: 4 }).map(() => randGear({ min: -100, max: 100 }, { min: 1, max: 2 })),
    width: rand(2, 4),
    // color: hexToRgb('#837f6e'),
    color: hexToRgb('#6b6759'),
    glowColor: hexToRgb('#c8fe5b'),
    depth: 0,
    glow,
    glowRadius: getGearsRadius(glow),
    shouldFollow: Math.random() < 0.2,
    targetX: rand(0, width)
  };
}

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '');

  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;

  const num = parseInt(full, 16);

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

export const HappySwamp = () => {
  const $cvs = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const mouseEnteredRef = useRef(false);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const field = useMemo<GrassBlade[]>(() => {
    const length = Math.min(~~(width / 2), 350);
    const margin = 50;
    const gap = (margin + width + margin) / length;
    return Array.from({ length }).map((e, i) => {
      const blade = generateGrassBlade(width, height);
      blade.grass[0].x = -margin + i * gap;
      blade.grass[0].y = height - 1;
      return blade;
    });
  }, [width, height]);

  const windGears = useRef([
    randGear({ min: 200, max: 200 }, { min: -0.5, max: -0.5 }), //
    randGear({ min: 80, max: 80 }, { min: 0.1, max: 0.1 }),
    randGear({ min: 200, max: 200 }, { min: -0.3, max: -0.3 }),
    randGear({ min: 30, max: 40 }, { min: 0.1, max: 0.5 })
  ]);

  const stars = useMemo<{ position: Point; size: number; brightness: number }[]>(() => {
    const length = ~~(window.innerWidth / 40);
    return Array.from({ length }).map(() => ({
      position: {
        x: rand(0, width),
        y: rand(0, height)
      },
      size: rand(0.5, 2),
      brightness: rand(0.1, 1)
    }));
  }, [width]);

  const windGears2 = useRef(windGears.current.map((g) => ({ ...g })));

  const moon = useMemo(() => {
    const w = width * 0.15;
    return {
      p: 0,
      x: width * 0.5,
      y: { from: height + w * 0.3, to: w + 10 },
      width: { from: w, to: w * 0.45 }
    };
  }, [width]);

  const butterflies = useMemo(() => {
    const length = ~~(width / 100);
    return Array.from({ length }).map((_, i) => {
      const b = generateButterfly(width);
      b.depth = i * 10 + rand(0, 5, true);
      return b;
    });
  }, [width]);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
    freezeOnceVisible: false
  });

  useEffect(() => {
    advanceGears(windGears2.current, 50);
  }, []);

  // mouse events
  useEffect(() => {
    if ($cvs.current) {
      const onMove = (e: MouseEvent) => {
        mouseX.current = e.offsetX;
        mouseY.current = e.offsetY;
      };
      const onResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      };
      const onEnter = () => {
        mouseEnteredRef.current = true;
      };
      const onLeave = () => {
        mouseEnteredRef.current = false;
      };
      $cvs.current.addEventListener('pointermove', onMove);
      $cvs.current.addEventListener('pointerenter', onEnter);
      $cvs.current.addEventListener('pointerleave', onLeave);
      window.addEventListener('resize', onResize);
      onResize();
      return () => {
        if ($cvs.current) {
          $cvs.current.removeEventListener('pointermove', onMove);
        }
      };
    }
  }, [$cvs]);

  // rendering scene
  useEffect(() => {
    if (isIntersecting) {
      let raf = 0;
      const ctx = $cvs.current.getContext('2d');

      // prerender background
      let backgroundCvs: OffscreenCanvas;
      const backgroundPositionY = height * 0.85;

      function prerenderBackground() {
        const w = width;
        const h = height * 0.15;
        backgroundCvs = new OffscreenCanvas(w, h);
        const ctx = backgroundCvs.getContext('2d');
        const grd = ctx.createLinearGradient(0, 0, 0, h);
        grd.addColorStop(0, '#093b0a00');
        grd.addColorStop(1, 'rgb(9, 21, 59)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      }
      prerenderBackground();

      // prerender foreground
      let foregroundCvs: OffscreenCanvas;
      const foregroundPositionY = height * 0.9;

      function prerenderForeground() {
        const w = width;
        const h = height * 0.1;
        foregroundCvs = new OffscreenCanvas(w, h);
        const ctx = foregroundCvs.getContext('2d');
        const grd = ctx.createLinearGradient(0, 0, 0, h);
        grd.addColorStop(0, 'rgba(64, 85, 25,0)');
        grd.addColorStop(1, 'rgb(61, 108, 38)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      }
      prerenderForeground();

      const clearCanvas = () => {
        ctx.clearRect(0, 0, $cvs.current.width, $cvs.current.height);
      };

      const renderStars = () => {
        stars.forEach((b) => {
          ctx.fillStyle = `rgba(255,255,255,${rand(b.brightness * 0.2, b.brightness)})`;
          ctx.beginPath();
          ctx.arc(b.position.x, b.position.y, b.size, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.fill();
        });
      };

      const renderGrassBlade = (grassblade: GrassBlade, index: number = 0) => {
        const thisWindGears = grassblade.windIndex == 0 ? windGears.current : windGears2.current;
        const windVector = getGearPosition(thisWindGears, index);

        windVector.x = clamp(windVector.x, -180, 180);
        // console.log(windVector.x)
        simulate(grassblade.grass, grassblade.springs, 0.1, -15);
        const d = grassblade.grass[0].x - mouseX.current;
        let windX = 0;
        const maxD = 200;

        if (mouseEnteredRef.current && mouseY.current > height * 0.5 && Math.abs(d) < maxD) {
          // user interacting with grass
          const dir = mouseX.current > grassblade.grass[0].x ? -1 : 1;
          const power = Math.pow(Math.abs(d), 0.25) * 1;
          windX = Math.abs(windVector.x) * 0.01 + power * dir;
        } else {
          // apply wind forces
          windX = windVector.x * 0.01;
        }

        for (let i = 1; i < grassblade.grass.length; i++) {
          grassblade.grass[i].x += windX / grassblade.grass[i].mass;
        }

        grassblade.ctx.clearRect(0, 0, grassblade.cvs.width, grassblade.cvs.height);

        ctx.fillStyle = grassblade.color;
        ctx.beginPath();
        const points = grassblade.grass;
        const len = points.length;
        let i = 1;
        let point = points[0];

        ctx.moveTo(point.x - point.width * 0.5, point.y);

        for (i = 1; i < len - 1; i++) {
          point = points[i];
          ctx.lineTo(point.x - point.width * 0.5, point.y);
        }
        point = points[i];
        ctx.lineTo(point.x, point.y);

        for (i = len - 1; i >= 0; i--) {
          point = points[i];
          ctx.lineTo(point.x + point.width * 0.5, point.y);
        }
        ctx.closePath();
        ctx.fill();
      };

      const renderBranch = () => {
        ctx.lineCap = 'round';

        let i = field.length;
        // let butterflyIndex = butterflies.length - 1;
        const windVector = getGearPosition(windGears.current);

        while (i--) {
          renderGrassBlade(field[i], i);

          // inject butterflies between branches - not the best but it works for now
          //   if (butterflyIndex > -1 && i < butterflies[butterflyIndex].depth) {
          //     // renderButterfly(butterflies[butterflyIndex], windVector);
          //     butterflyIndex--;
          //   }
        }

        i = butterflies.length;
        while (i--) {
          renderButterfly(butterflies[i], windVector);
        }
      };

      const renderButterfly = (b: Butterfly, windVector: Point) => {
        // use vector to draw bugs close to the ground
        const targetY = height * 0.8;
        const vy = (targetY - b.anchor.y) / 200;

        const targetX = b.shouldFollow ? mouseX.current : b.targetX;
        const vx = (targetX - b.anchor.x) / 200;

        // b.vector.x += vx;
        // b.vector.y += vy;
        const lastX = b.position.x;

        const offset = advanceGears(b.flutter);
        b.anchor.x += vx + windVector.x * 0.01;
        b.anchor.y += vy;
        b.position.x = b.anchor.x + offset.x;
        b.position.y = b.anchor.y + offset.y;

        const glow = advanceGears(b.glow, 10);
        const colorTerp = glow.x / b.glowRadius;
        const color = colorTerp > 0.5 ? b.glowColor : b.color;
        const attackAngle = interpolate(35, -35, (vx + 1) / 2) * RAD;

        ctx.fillStyle = `rgb(${color.r},${color.g},${b.color.b})`;
        ctx.beginPath();
        ctx.ellipse(b.position.x, b.position.y, b.width, b.width * 0.5, attackAngle, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        return;

        /*
        if (Math.random() < 0.01) {
          const gearIndex = rand(0, b.flutter.length - 1, true);
          const gear = b.flutter[gearIndex];
        //   gear.s = rand(gear.args.speed.min, gear.args.speed.max);
        }
        if (b.shouldFollow) {
        //   b.vector.x += (mouseX.current - b.position.x) * 0.02;
        //   b.vector.y += (mouseY.current - b.position.y) * 0.01;
        }
        b.vector.x *= 0.3;
        b.vector.y *= 0.3;
        b.anchor.x += b.vector.x;
        b.anchor.y += b.vector.y;

        const glow = advanceGears(b.glow, 10);
        const flutter = advanceGears(b.flutter);

        b.vector.x += flutter.x;
        b.vector.y += flutter.y;

        b.position.x += b.vector.x;
        b.position.y += b.vector.y;

        const offset = { x: 0, y: 0 };

        for (let i = 0; i < b.flutter.length; i++) {
          const f = b.flutter[i];
          f.a += f.s;
          offset.x += Math.sin(f.a * RAD) * f.r;
          offset.y += Math.cos(f.a * RAD) * f.r;
        }
        b.position.x = b.anchor.x + offset.x;
        b.position.y = b.anchor.y + offset.y;

        // b.vector.y -= (b.position.y - height * 0.8) * 0.01;
        // b.vector.x -= (b.position.x - width * 0.8) * 0.01;

        const colorTerp = glow.x / b.glowRadius;
        // ctx.fillStyle = `rgb(${interpolate(b.color.r, b.glowColor.r, colorTerp)},${interpolate(b.color.g, b.glowColor.g, colorTerp)},${interpolate(b.color.b, b.glowColor.b, colorTerp)})`;
        const color = colorTerp > 0.5 ? b.glowColor : b.color;
        ctx.fillStyle = `rgb(${color.r},${color.g},${b.color.b})`;
        ctx.fillStyle = '#000';

        ctx.beginPath();
        // ctx.arc(b.position.x, b.position.y, b.width, 0, 2 * Math.PI);
        ctx.ellipse(b.position.x, b.position.y, b.width, b.width * 0.5, 0, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        */
      };

      const renderMoon = () => {
        let y = moon.y.to;
        let w = moon.width.to;

        if (moon.p < 1) {
          moon.p += 0.0002;
          y = interpolate(moon.y.from, moon.y.to, moon.p);
          w = interpolate(moon.width.from, moon.width.to, moon.p);
        }

        ctx.save();
        ctx.filter = 'blur(2px)';
        ctx.fillStyle = '#f6f7ed';
        ctx.beginPath();
        ctx.arc(moon.x, y, w, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      };

      const renderBackground = () => {
        ctx.drawImage(backgroundCvs, 0, backgroundPositionY);
      };

      const renderForeground = () => {
        ctx.drawImage(foregroundCvs, 0, foregroundPositionY);
      };

      const renderWind = () => {
        advanceGears(windGears.current, 2);
        advanceGears(windGears2.current, 2);
      };

      const animate = () => {
        clearCanvas();
        renderStars();
        renderMoon();
        renderBackground();
        renderWind();
        renderBranch();
        renderForeground();
        raf = requestAnimationFrame(animate);
      };

      // pre-render to clean up initial state
      for (let i = 0; i < 160; i++) {
        let i = field.length;
        while (i--) {
          renderGrassBlade(field[i], i);
        }
      }

      animate();

      return () => {
        cancelAnimationFrame(raf);
      };
    }
  }, [isIntersecting, width]);

  return (
    <div ref={ref}>
      <div style={{ height: '40vh' }} />
      <canvas ref={$cvs} width={width} height={height} style={{ verticalAlign: 'bottom' }} />
    </div>
  );
};

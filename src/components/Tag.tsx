import type { ReactNode } from 'react';

export function Tag({ children, url }: { children: ReactNode; url?: string }) {
  if (url) {
    return (
      <a className='tag' href={url} target='_blank' rel='noreferrer'>
        {children}
      </a>
    );
  }
  return <span className='tag'>{children}</span>;
}

export const Tags = {
  PixiJS: () => <Tag url='https://pixijs.com/'>PixiJS</Tag>,
  React: () => <Tag url='https://reactjs.org/'>React</Tag>,
  TypeScript: () => <Tag url='https://www.typescriptlang.org/'>TypeScript</Tag>,
  CSS3: () => <Tag url='https://www.css3.info/'>CSS3</Tag>,
  SVG: () => <Tag url='https://en.wikipedia.org/wiki/SVG'>SVG</Tag>,
  WebAudio: () => <Tag url='https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API'>Web Audio</Tag>,
  Canvas: () => <Tag url='https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API'>HTML Canvas</Tag>,
  WebXR: () => <Tag url='https://www.w3.org/TR/webxr/'>Web XR</Tag>,
  ThreeJS: () => <Tag url='https://threejs.org/'>ThreeJS</Tag>
};

import { useState } from 'react';

const fields = [
  { name: 'stories', label: 'Stories / month', initial: '12', max: 100000 },
  { name: 'minutes', label: 'Minutes saved / story', initial: '30', max: 1440 },
  { name: 'labor', label: 'Labor / hour ($)', initial: '45', max: 10000, step: '0.01' },
  { name: 'cost', label: 'Recurring cost / month ($)', initial: '120', max: 1000000, step: '0.01' },
];

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

export default function RoiCalculator() {
  const [values, setValues] = useState(() => Object.fromEntries(fields.map(({ name, initial }) => [name, initial])));
  const [valid, setValid] = useState(true);
  const { stories, minutes, labor, cost } = Object.fromEntries(
    Object.entries(values).map(([name, value]) => [name, Number(value)]),
  );
  const hours = stories * minutes / 60;
  const valuePerStory = minutes * labor / 60;
  const gross = hours * labor;
  const net = gross - cost;
  const roi = cost > 0 ? number.format(net / cost * 100) + '% ROI' : 'ROI undefined at zero cost';
  let breakEven = 'unavailable at zero labor value';
  if (cost === 0) breakEven = '0 stories / month';
  else if (valuePerStory > 0) breakEven = number.format(Math.ceil(cost / valuePerStory)) + ' stories / month';

  function update(event) {
    const { name, value, form } = event.target;
    setValues(current => ({ ...current, [name]: value }));
    setValid(form.checkValidity());
  }

  return (
    <form aria-label="Illustrative ROI calculator" onSubmit={event => event.preventDefault()}>
      <div className="input-grid">
        {fields.map(({ name, label, max, step }) => (
          <label key={name}>
            {label}
            <input name={name} type="number" min="0" max={max} step={step} value={values[name]} onChange={update} required />
          </label>
        ))}
      </div>
      <output aria-live="polite">
        {valid ? (
          <>
            <strong>{money.format(net)} net / month</strong>
            <span>{number.format(hours)} hours saved · {money.format(gross)} labor value · {roi}</span>
            <span>Break-even · {breakEven}</span>
          </>
        ) : <strong>Enter valid values for all four inputs.</strong>}
      </output>
    </form>
  );
}

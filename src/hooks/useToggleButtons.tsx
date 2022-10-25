import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

interface IEntry {
  [key: string]: JSX.Element;
}

export default function useToogleButtons(
  entry: IEntry,
): [() => JSX.Element, string] {
  const keys = Object.keys(entry);

  const values = Object.values(entry);

  if (!keys || keys.length < 1) throw Error('Do not use Empty Entry.');

  const [selected, setSelected] = useState(keys[0]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string,
  ) => {
    setSelected(nextView);
  };

  let Element = () => (
    <ToggleButtonGroup
      orientation="horizontal"
      onChange={handleChange}
      exclusive
      value={selected}
    >
      {values.map((TempElement, index) => (
        <ToggleButton key={keys[index]} value={keys[index]}>
          {TempElement}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );

  return [Element, selected];
}

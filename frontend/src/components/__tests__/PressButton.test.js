import PressButton from '../PressButton';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// below I comment the line 18 and 19, if I didn't comment that 2 lines the two tests can be combine in to one
it('testing library - render the PressButton', () => {
  const thePressButton = { pressed: false };
  const handleToggle = () => (thePressButton.pressed = !thePressButton.pressed);

  const { getByTestId } = render(
    <PressButton thePressButton={thePressButton} onToggle={handleToggle} />
  );

  const pressedBtn = getByTestId('pressImg');
  fireEvent.click(pressedBtn);
  expect(thePressButton.pressed).toBe(true);

  // fireEvent.click(pressedBtn);
  // expect(thePressButton.pressed).toBe(false);
});

it('testing library - render the PressButton2', () => {
  const thePressButton = { pressed: true };
  const handleToggle = () => (thePressButton.pressed = !thePressButton.pressed);

  const { getByTestId } = render(
      <PressButton thePressButton={thePressButton} onToggle={handleToggle} />
  );

  const pressedBtn = getByTestId('pressImg');

  fireEvent.click(pressedBtn);
  expect(thePressButton.pressed).toBe(false);
});
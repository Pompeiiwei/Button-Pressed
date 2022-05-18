import { useContext} from 'react';
import PressButton from './components/PressButton';
import {AppContext} from "./AppContextProvider";

function App() {
  const { thePressButton, updatePressButton } = useContext(AppContext);
  let containerClass = thePressButton.pressed
    ? 'container open'
    : 'container close';

  const handleToggle = () => {
    updatePressButton({ ...thePressButton, pressed: !thePressButton.pressed });
  };

  return (
    <div className={containerClass}>
      <PressButton thePressButton={thePressButton} onToggle={handleToggle} />
      <div>{thePressButton.pressed ? 'Open!' : 'Close!'}</div>
    </div>
  );
}

export default App;

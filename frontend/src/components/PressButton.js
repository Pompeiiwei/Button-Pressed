

const PressButton = ({ thePressButton, onToggle }) => {
  const imgSrc = `button-${
    thePressButton.pressed ? 'pressed' : 'unpressed'
  }.png`;

  const alt = thePressButton.pressed ? 'Pressed!' : 'Unpressed!';

  return (
    <div>
      <img
        data-testid="pressImg"
        className="img"
        src={imgSrc}
        alt={alt}
        onClick={onToggle}
      />
    </div>
  );
};

export default PressButton;

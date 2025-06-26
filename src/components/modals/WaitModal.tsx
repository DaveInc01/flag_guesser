import React from 'react';
import { useSpring, animated } from 'react-spring';
import DangerButton from '../ui-elements/buttons/DangerButton';
import { leaveGame } from './Register';

const WaitModalStyles: React.CSSProperties = {
  width: '300px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)', 
  zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.8)',
  padding: '20px',
  borderRadius: '10px', 
  color: '#fff' 
}

type WaitModalProps = {  cancelButton?: boolean; setShowWait?: (show: boolean) => void; };

const WaitModal: React.FC<WaitModalProps> = ({cancelButton, setShowWait} ) => {
  const dots = ['.', '..', '...'];
  const [index, setIndex] = React.useState(0);
  leaveGame()
  // Animation for fading in and out
  const fade = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    reverse: index % 2 === 0,
    config: { duration: 500 },
    onRest: () => {
      setIndex((prevIndex) => (prevIndex + 1) % dots.length);
    },
  });

  
  return (
    <div style={WaitModalStyles}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <animated.div style={fade}>
          <span>Loading{dots[index]}</span>
        </animated.div>
        {cancelButton && 
        <DangerButton text={"Cancel"} onClick={()=>{
          setShowWait && setShowWait(false); 
          leaveGame()
        }}/>}
      </div>
    </div>
  );
};

export default WaitModal;
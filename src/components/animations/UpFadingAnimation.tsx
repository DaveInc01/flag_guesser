
import React, { useEffect, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';

export default function UpFadingAnimation({ isAnswerCorrect }: { isAnswerCorrect: boolean }) {
  const [visible, setVisible] = useState(false);

  // Trigger the animation when isAnswerCorrect changes
  useEffect(() => {
    if (isAnswerCorrect !== null) {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 1500); // Hide after 1.5s
      return () => clearTimeout(timeout);
    }
  }, [isAnswerCorrect]);

  const transition = useTransition(visible, {
    from: { opacity: 0, y: -50 },
    enter: { opacity: 1, y: -230 },
    leave: { opacity: 0 },
    config: { tension: 170, friction: 25 },
  });

  return transition(
    (style, item) =>
      item && (
        <animated.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 8,
            ...style,
          }}
        >
          {isAnswerCorrect ? (
            <h2 style={{ color: 'green' }}>Correct!</h2>
          ) : (
            <h2 style={{ color: '#ff6d6d' }}>Wrong!</h2>
          )}
        </animated.div>
      )
  );
}
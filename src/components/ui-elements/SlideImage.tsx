
import { useSpring, animated } from '@react-spring/web';

type winType = {
    isWin: boolean
}

const SlideImage = (props: winType) => {
    let imagePath = `${process.env.PUBLIC_URL}/assets/images/icons/party-popper.png`;
    // props.isWin ? imagePath = "win.png" : "losse.png"
    const styles = useSpring({
    from: { transform: 'translateX(-100%)', opacity: 0 },
    to: async (next) => {
        await next({ transform: 'translateX(10%)', opacity: 1 });     // appear from left
        await next({ transform: 'translateX(100%)', opacity: 0 });    // disappear to right
    },
    config: { duration: 1500 },
    });

  return (
    <animated.img
      src={imagePath}
      alt="Sliding PNG"
      style={{
        width: '100px',
        position: 'absolute',
        top: '15%',
        // transform: 'translateY(-50%)',
        ...styles,
      }}
    />
  );
};

export default SlideImage;
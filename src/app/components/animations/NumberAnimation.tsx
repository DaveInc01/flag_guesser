import { useSpring, animated } from "react-spring";

export const NumberAnimation = ({from, to}: {from: number, to: number}) => {
    const { number } = useSpring({
        from: {number: from},
        number: to,
        delay: 200,
        config: {mass: 1, tension: 30, friction: 10}
    });

    return <animated.div>{number.to(n => n.toFixed(0))}</animated.div>
}
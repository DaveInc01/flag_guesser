import {range} from 'lodash'
import { useSpring, animated } from "react-spring";
import '../../style/Hearts.css'
import { useEffect, useRef } from 'react';

// export const Hearts = ({maxCount, count}:{maxCount:number, count: number}) =>
// {
//     const heartsDiv = useRef<HTMLDivElement>(null);
//     const [springStyle, api]= useSpring(()=>({
//         transform: 'translate3d(0px, 0px, 0px)',
//         config: {tension: 300, friction: 10}
//     }))

//     // const transform = x.to({
//     //     range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
//     //     output: [-10, 10, -10, 10, -10, 10, -10, 10],
//     //   }).to(x => `translate3d(${x}px, 0px, 0px)`);
//     // console.log("count ", count)
//     useEffect(()=>{
//         console.log("in use effect, count - ", count)
//         api.start({
//             from:{transform: 'translate3d(0px, 0px, 0px)'},
//             to: [
//                 { transform: 'translate3d(20px, 0px, 0px)' },
//                 { transform: 'translate3d(-20px, 0px, 0px)' },
//                 { transform: 'translate3d(0px, 0px, 0px)' }
//             ]
//         })
//     }, [count])
//    return (
//     <animated.div ref={heartsDiv} className="heart-content" style={springStyle}>
//       {range(maxCount).map((_, i) => (
//         <animated.img
//           key={i}
//           src={`/assets/images/icons/${i < count ? 'heart.png' : 'heart-lose.png'}`}
//         />
//       ))}
//     </animated.div>
//   );
// }

type HeartsProps = {
    maxCount: number;
    count: number;
  };
  
  export const Hearts: React.FC<HeartsProps> = ({ maxCount, count }) => {
    const heartsDiv = useRef<HTMLDivElement>(null);
  
    // Spring for transform value (x axis)
    const [style, api] = useSpring(() => ({
      x: 0,
      config: { duration: 600 }, // optional, adjust as needed
    }));
  
    // Trigger animation when count changes
    useEffect(() => {
        if(count != maxCount){
            api.start({
              from: { x: 0 },
              to: { x: 1 },
            });
        }
    }, [count]);
  
    // Apply interpolated transform
    const transform = style.x
      .to({
        range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
        output: [-10, 10, -10, 10, -10, 10, -10, 0],
      })
      .to((val) => `translate3d(${val}px, 0px, 0px)`);
  
    return (
      <animated.div
        ref={heartsDiv}
        className="heart-content"
        style={{ transform }}
      >
        {range(maxCount).map((_, i) => (
          <animated.img
            key={i}
            src={`/assets/images/icons/${i < count ? 'heart.png' : 'heart-lose.png'}`}
          />
        ))}
      </animated.div>
    );
  };
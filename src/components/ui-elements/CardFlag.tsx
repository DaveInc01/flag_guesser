import '../../style/CardFlag.css'
import { MouseEvent, useState } from "react";
import { ICountry } from "../../constants/countries";
import { useSpring, a } from '@react-spring/web'
import { concat, toLower } from 'lodash';


export type ICardFlag = {
    country: {className: string} & ICountry,
    clickCallback: (
        countryCode: ICountry['name'],
        ev: MouseEvent<HTMLElement>
    ) => void,
}

export const CardFlag = ({country: {name, className, code}, clickCallback,}:ICardFlag)=>{
    const iconClassname = `fi fi-${code}`
    const flipImageUrl = `${process.env.PUBLIC_URL}/assets/images/each_country/${toLower(name)}.1.jpg`;
    console.log("flipImage ", flipImageUrl)
    const [flipped, setFlipped] = useState(false)
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
      })
    return (
        <div className={'main-card '} onClick={(ev) => {
            setFlipped(flipped => !flipped)
            // card back flip after timeout
            setTimeout(()=>{setFlipped(flipped => !flipped)}, 1500)
            return clickCallback(name, ev)
        }}>
            <a.div
                className="c"
                style={{
                backgroundImage: `url(${flipImageUrl})`,
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left",
                opacity,
                transform,
                rotateX: '180deg',
                }}
             />
            <a.div
                className={`${iconClassname} ${className} c`}
                style={{ opacity: opacity.to(o => 1 - o), transform }}
            />
        </div>
    )
}

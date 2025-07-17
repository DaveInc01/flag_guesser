import { ICountry } from "../../constants/countries";
import { CardFlag } from "../ui-elements/CardFlag";
import '../../style/PlayContent.css';
import { MaxScore } from "../ui-elements/MaxScore";
import { useEffect, useRef, useState } from "react";
import UpFadingAnimation from "../animations/UpFadingAnimation";
import { selectorIsCorrectAnswer  } from "../../features/user/userSelector";
import { useAppSelector } from "../../app/hooks";
const flagTableStyle:React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: "15px",
    textAlign: "center"
}

const titleStyle:React.CSSProperties = {
    fontSize: "35px",
    textShadow: "-4px 4px 8px black",
    marginBottom: "50px"
}

type IItemFlag = ICountry & {className: string};

export type IPlayContent = {
    score:number, 
    countries: IItemFlag[],
    style?: React.CSSProperties,
    rightCountryName: ICountry['name'],
    onSelect: (selectedCountryName: ICountry['name']) => void,
    onTimeUp: () => void
    onSetScore: () => void,
};

export const PlayContent = ({
    score,
    style,
    countries,
    rightCountryName,
    onSelect
}: IPlayContent)=> {
    const titleRef = useRef<HTMLHeadingElement | null>(null)
    const [upAnim, setUpAnim] = useState<boolean | null>(null)
    const UpAnimRef = useRef<HTMLDivElement | null>(null)
    const isCorretAnswer = useAppSelector(selectorIsCorrectAnswer)
    console.log("IscorrectAnswer - ", isCorretAnswer)
    useEffect(()=>{
        setUpAnim(isCorretAnswer)
    }, [isCorretAnswer])

    return (
    <div className="play-content">
        <hr style={{margin: "20px 0px"}}/>
        <h2 style={titleStyle} ref={titleRef}>{rightCountryName}</h2>
        <div ref={UpAnimRef}></div>
        {upAnim != null &&(
            upAnim ? (
                <UpFadingAnimation isAnswerCorrect={true}/>
            ) :
            (
                <UpFadingAnimation isAnswerCorrect={false}/>
            )
            
        )
        }
        <div style={{...flagTableStyle, ...style}}>
            {countries.map((country, key)=>
                <CardFlag
                key={key}
                country={country} 
                clickCallback={(countryName, ev) => onSelect(countryName)} />)}
        </div>
        <MaxScore text={`score: ${score}`} className="play-score"/>
    </div>  
)}

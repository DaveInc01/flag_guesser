import { ICountry } from "../../constants/countries";
import { CardFlag } from "../ui-elements/CardFlag";
import '../../style/PlayContent.css';
import { MaxScore } from "../ui-elements/MaxScore";
import { useRef } from "react";

const flagTableStyle:React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: "15px",
    textAlign: "center"
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
    return (
    <div className="play-content">
        <MaxScore text={`score: ${score}`} className="play-score"/>
        <h2 ref={titleRef}>{rightCountryName}</h2>
        <div style={{...flagTableStyle, ...style}}>
            {countries.map((country, key)=>
                <CardFlag
                    key={key}
                    country={country} 
                    clickCallback={(countryName, ev) => onSelect(countryName)} />)}
        </div>
    </div>  
)}

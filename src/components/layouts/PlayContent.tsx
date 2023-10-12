import { ICountry } from "../../constants/countries";
import { CardFlag } from "../ui-elements/CardFlag";
import '../../style/PlayContent.css';

const flagTableStyle:React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: "15px"
}
type IItemFlag = ICountry & {className: string};

export type IPlayContent = {
    score:number, 
    countries: IItemFlag[],
    style?: React.CSSProperties,
    rightCountryName: ICountry['countryName'],
    onSelect: (selectedCountryName: ICountry['countryName']) => void,
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
return (
    <div className="play-content">
        <div className="score">{`score: ${score}`}</div>
        <h2>{rightCountryName}</h2>
        <div style={{...flagTableStyle, ...style}}>
            {countries.map((country, key)=>
                <CardFlag
                    key={key}
                    country={country} 
                    clickCallback={(countryName, ev) => onSelect(countryName)}  />)}
        </div>
    </div>  
)}
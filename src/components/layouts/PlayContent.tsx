import { ICountry } from "../../constants/countries";
import { CardFlag } from "../ui-elements/CardFlag";

import '../../style/PlayContent.css'
import { useState } from "react";

const flagTableStyle:React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: "15px"
}

export const PlayContent = ({score, countries}:{score:number, countries: ICountry[]})=> {

const [activeFlagName, setActiveFlagName] = useState<ICountry['country']>('');
const rightFlag = countries[0];

return (
    <div className="play-content">
        <div className="score">{`score: ${score}`}</div>
        <h2>{rightFlag.country}</h2>
        <div style={flagTableStyle}>
            {countries.map((country, key)=>
                <CardFlag
                    key={key}
                    country={country} 
                    className={''} 
                    clickCallback={(countryName, ev) => setActiveFlagName(countryName)}  />)}
        </div>
    </div>

)}
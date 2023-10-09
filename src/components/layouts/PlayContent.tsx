import { ICountry } from "../../constants/countries";
import { CardFlag } from "../ui-elements/card-flag/CardFlag";
import './PlayContent.css'

const flagTableStyle:React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: "15px"
}

export const PlayContent = ({score, countries}:{score:number, countries: ICountry[]})=> 
(
    <div className="play-content">
        <div className="score">{`score: ${score}`}</div>
        <h2>{countries[0].country}</h2>
        <div style={flagTableStyle}>
            {countries.map(country=>
                <CardFlag 
                    rightCountryCode={countries[0].code} 
                    country={country} />)}
        </div>
    </div>

)
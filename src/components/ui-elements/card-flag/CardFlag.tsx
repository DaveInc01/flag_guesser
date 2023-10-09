import { ICountry } from "../../../constants/countries";
import './CardFlag.css'

export const CardFlag = ({rightCountryCode, country: {flag, code}}:{rightCountryCode: string, country: ICountry})=>{
    const isRightCard = () => code === rightCountryCode

    return (
        <div className="main-card">
            <span>
                <img src={flag} />
            </span>
        </div>
    )
}
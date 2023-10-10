import '../../style/CardFlag.css'
import { MouseEvent } from "react";
import { ICountry } from "../../constants/countries";

type ICardFlag = {country: ICountry, clickCallback: (countryCode: ICountry['country'], ev: MouseEvent<HTMLElement>) => void, className: string}
export const CardFlag = ({country: {flag, country}, className, clickCallback}:ICardFlag)=>{
    return (
        <div className={'main-card '.concat(className)} onClick={(ev) => clickCallback(country, ev)}>
            <span>
                <img src={flag} />
            </span>
        </div>
    )
}
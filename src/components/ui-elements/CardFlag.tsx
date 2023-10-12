import '../../style/CardFlag.css'
import { MouseEvent } from "react";
import { ICountry } from "../../constants/countries";

export type ICardFlag = {
    country: {className: string} & ICountry,
    clickCallback: (
        countryCode: ICountry['countryName'],
        ev: MouseEvent<HTMLElement>
    ) => void,
}

export const CardFlag = ({country: {flag, countryName, className}, clickCallback}:ICardFlag)=>{
    return (
        <div className={'main-card '.concat(className)} onClick={(ev) => clickCallback(countryName, ev)}>
            <span>
                <img src={flag} />
            </span>
        </div>
    )
}
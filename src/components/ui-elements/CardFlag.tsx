import '../../style/CardFlag.css'
import { MouseEvent } from "react";
import { ICountry } from "../../constants/countries";


export type ICardFlag = {
    country: {className: string} & ICountry,
    clickCallback: (
        countryCode: ICountry['name'],
        ev: MouseEvent<HTMLElement>
    ) => void,
}

export const CardFlag = ({country: {name, className, code}, clickCallback,}:ICardFlag)=>{
    const iconClassname = `fi fi-${code}`;
    return (
        <div className={'main-card '} onClick={(ev) => clickCallback(name, ev)}>
            <span className={iconClassname.concat(' ', className)} ></span>
        </div>
    )
}
// style={{fontSize: "10rem"}}
import './index.css';
import { CSSProperties, MouseEvent } from "react";

type IButtonIcon = {
    icon: string, 
    className?: string,
    clickCallback: (ev: MouseEvent<HTMLElement>)=>void
}

export const ButtonIcon = ({
        icon, 
        className = '',
        clickCallback,
    }: IButtonIcon) => {
   return (
        <button className={className.concat(' btn')}>
            <img src={icon} onClick={clickCallback}/>
        </button>
   )
}
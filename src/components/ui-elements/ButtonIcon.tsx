import { MouseEvent } from "react";
import '../../style/ButtonIcon.css';
import { Link, NavLink } from "react-router-dom";

type IButtonIcon = {
    icon: string, 
    path?: string,
    className?: string,
    clickCallback: (ev: MouseEvent<HTMLElement>)=>void
}

export const ButtonIcon = ({
        icon, 
        path,
        className = '',
        clickCallback,
    }: IButtonIcon) => {
   return (
    <NavLink to={path || ''}>
        <button className={className.concat(' btn')}>
            <img src={icon} onClick={clickCallback}/>
        </button>
    </NavLink>
   )
}
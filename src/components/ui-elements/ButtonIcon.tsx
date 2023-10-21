import { MouseEvent } from "react";
import '../../style/ButtonIcon.css';
import { playSound } from "../../services/audio";
import { ISounds } from "../../constants/media";

type IButtonIcon = {
    icon: string, 
    className?: string,
    clickCallback: (ev: MouseEvent<HTMLElement>)=>void
}

export const ButtonIcon = ({
        icon, 
        className = '',
        clickCallback,
    }: IButtonIcon) => (<span className={className}><button className="btn">
        <img src={icon} onClick={e => {
            clickCallback(e);
            playSound(ISounds.button, true);
        } }/>
    </button></span>)


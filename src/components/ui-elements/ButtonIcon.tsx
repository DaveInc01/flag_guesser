import { MouseEvent } from "react";
import '../../style/ButtonIcon.css';
import { playSound } from "../../services/audio";
import { ISounds } from "../../constants/media";
import { useAppSelector } from "../../app/hooks";
import { selectorSounds } from "../../features/user/userSelector";

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
    const soundSettings = useAppSelector(selectorSounds);
    return (
    <span className={className} onClick={e => {
        clickCallback(e);
        playSound(ISounds.button, soundSettings);
    }}>
        <button className="btn">
            <img src={icon} />
        </button>
    </span>)
    }


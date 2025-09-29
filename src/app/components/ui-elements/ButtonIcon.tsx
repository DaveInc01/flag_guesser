'use client';
import { MouseEvent } from "react";
import '../../style/ButtonIcon.css';
import { ISounds } from "../../constants/media";
import { useAppSelector } from "@/app/hooks";
import { selectorIsSoundsOn } from "../../features/user/userSelector";
import { playSound } from "@/app/features/services/audio";

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
    const soundSettings = useAppSelector(selectorIsSoundsOn);
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


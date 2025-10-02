'use client';
import React, { useState } from 'react'
import '../../style/SettingsSlide.css'
import { selectorIsSoundsOn } from "../../features/user/userSelector";
import { toggleSounds } from '../../features/user/userSlice';
import { ISounds } from '../../constants/media';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { playSound } from '@/app/features/services/audio';

const slideStyle: React.CSSProperties = {
    display: "flex",
    backgroundColor: "rgb(247, 145, 30)",
    padding: "6px",
    boxShadow: "rgb(133, 56, 28) 1px 5px",
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px",
    position: "absolute",
    right: "0",
    marginTop: "20px"
}

export const SettingsSlide = ()=>{
    const dispatch = useAppDispatch()
    const sounds = useAppSelector(selectorIsSoundsOn)
    const [slide, setSlide] = useState(false);

    let isSoundsOn = useAppSelector(selectorIsSoundsOn)
    let soundImage: string;
    if (isSoundsOn)
        soundImage = '/assets/images/icons/sound-on.png'
    else
        soundImage = '/assets/images/icons/sound-off.png'
    // dispatch(toggleSounds(false));
    const soundToggle = () => {
        console.log("Toggle sound")
        playSound(ISounds.button, !isSoundsOn).catch(()=> console.log("sound error"));
        dispatch(toggleSounds(!isSoundsOn));
    }
  
    return (
        <div style={slideStyle}>
            <span className='span-elem' onClick={()=>setSlide(!slide)}>
                <img src="/assets/images/icons/settings.png" alt="" />
            </span>
            {slide &&
            <span className='span-elem' onClick={soundToggle}>
                <img src={soundImage} alt="" />
            </span>
            }
        </div>
    )
}

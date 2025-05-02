import React, { useState } from 'react'
import '../../style/SettingsSlide.css'
import { animated, useSpring } from 'react-spring';
import { set } from 'lodash';
import { selectorSounds } from "../../features/user/userSelector";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { toggleSounds } from '../../features/user/userSlice';
import { playSound } from "../../services/audio";
import { ISounds } from '../../constants/media';


export const SettingsSlide = ()=>{
    const dispatch = useAppDispatch()
    const imgSoundOn = '/assets/images/icons/sound-on.png';
    const imgSoundOff = '/assets/images/icons/sound-off.png';
    const [slide, setSlide] = useState(false);
    const [sound, setSound] = useState(imgSoundOn);

    let sounds_settings = useAppSelector(selectorSounds)
    // dispatch(toggleSounds(false));
    const soundToggle = () => {
        if (sound === imgSoundOn) {
            setSound(imgSoundOff);
            dispatch(toggleSounds(false));
        } else {
            setSound(imgSoundOn);
            playSound(ISounds.button, true).catch(()=> console.log("sound error"));
            dispatch(toggleSounds(true));
        }
    };
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

    return (
        <div style={slideStyle}>
            <span className='span-elem' onClick={()=>setSlide(!slide)}>
                <img src="/assets/images/icons/settings.png" alt="" />
            </span>
            {slide &&
            <span className='span-elem' onClick={soundToggle}>
                <img src={sound} alt="" />
            </span>
            }
        </div>
    )
}

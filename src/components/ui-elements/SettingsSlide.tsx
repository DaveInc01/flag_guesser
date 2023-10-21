import { useState } from 'react'
import '../../style/SettingsSlide.css'
import { animated, useSpring } from 'react-spring';

export const SettingsSlide = ()=>{
    const isTurnOff = false;
    const [slide, setSlide] = useState(false);
    const imgSoundOn = '/assets/images/icons/sound-on.png';
    const imgSoundOff = '/assets/images/icons/sound-off.png';
    const moveSlide = () =>{
        setSlide(!slide)
        console.log(slide)
    }

    const openStyle ={
    width: "fit-content",
    backgroundColor: "rgb(247, 145, 30)",
    padding: "6px",
    boxShadow: "rgb(133, 56, 28) 1px 5px",
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px",
    position: "absolute",
    right: "0"
} 
    const closeStyle ={
    width: "fit-content",
    backgroundColor: "rgb(247, 145, 30)",
    padding: "6px",
    boxShadow: "rgb(133, 56, 28) 1px 5px",
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px",
    position: "absolute",
    right: "-9"
    } 
    // const openCloseAnimation = useSpring({
    //     to: {

    //     },
    //     from: {

    //     }
    // })
    return (
        <div className={slide ? 'open-style' : 'close-style'} >
            <span className='setting' onClick={moveSlide}>
                <img src="/assets/images/icons/settings.png" alt="" />
            </span>
            <span className='sounds-button'>
                <img src={imgSoundOn} alt="" />
            </span>
        </div>
    )
}

import React, { ComponentType, useEffect } from "react"
import { HomeButton } from "../ui-elements/HomeButton";
import { navigationItems } from "../../constants/navigation";
import { useNavigate } from "react-router-dom";
import { HomeHeader } from "../layouts/HomeHeader";
import { paths } from "../../constants/paths";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { decrementCoins, decrementEnergy } from "../../features/user/userSlice";

import '../../index.css';
import { playSound } from "../../services/audio";
import { ISounds } from "../../constants/media";
import { selectorSounds } from "../../features/user/userSelector";
import { SettingsSlide } from "../ui-elements/SettingsSlide";

export const HomePage:ComponentType<{}>  = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const sounds   = useAppSelector(selectorSounds)

    const menuStyle:React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
    }
    
    return (
        <React.Fragment>
            <HomeHeader />
            <div className="home-menu" style={menuStyle}>
                {navigationItems.map(({title, path}, index) =>
                    <HomeButton key={index} title={title} onClick={() => {
                        playSound(ISounds.button, sounds).then(() => {
                            if(path.includes(paths.Play)) {
                                dispatch(decrementEnergy())
                                Promise
                                .resolve(new Promise((r) => setTimeout(() => r(null), 200)))
                                .then(() => navigate(path))
                            } else {
                                navigate(path)
                            }
                        })   
                    }} />
                )}
            </div>
            <SettingsSlide />
        </ React.Fragment>
    )
}
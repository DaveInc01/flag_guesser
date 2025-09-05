'use client';
import React, { ComponentType, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks";
import { useRouter } from "next/navigation";
import { selectorSounds } from "./features/user/userSelector";
import { HomeHeader } from "./components/layouts/HomeHeader";
import { HomeButton } from "./components/ui-elements/HomeButton";
import { navigationItems } from "./constants/navigation";
import { playSound } from "./features/services/audio";
import { ISounds } from "./constants/media";
import { paths } from "./constants/paths";
import { decrementEnergy } from "./features/user/userSlice";
import { SettingsSlide } from "./components/ui-elements/SettingsSlide";


export default function Home () {
    const dispatch = useAppDispatch()
    const router = useRouter();
    const navigate = (path: string) => router.push(path);
    let sounds   = useAppSelector(selectorSounds)

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
                                // dispatch(setIsCorrectAnswer(null))
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
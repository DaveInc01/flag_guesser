import React, { ComponentType } from "react"
import { HomeButton } from "../ui-elements/HomeButton";
import '../../index.css';
import { navigationItems } from "../../constants/navigation";
import { useNavigate } from "react-router-dom";
import { HomeHeader } from "../layouts/HomeHeader";
import { paths } from "../../constants/paths";
import { useAppDispatch } from "../../app/hooks";
import { decrementCoins, decrementEnergy } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

export const HomePage:ComponentType<{}>  = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
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
                        if(path.includes(paths.Play)) {
                            dispatch(decrementEnergy());
                            
                            Promise
                            .resolve(new Promise((r) => setTimeout(() => r(null), 600)))
                            .then(() => navigate(path))
                            
                        } else {
                            navigate(path)
                        }
                    }} />
                )}
            </div>
        </ React.Fragment>
    )
}
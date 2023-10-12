import React, { ComponentType } from "react"
import { HomeButton } from "../ui-elements/HomeButton";
import '../../index.css';
import { navigationItems } from "../../constants/navigation";
import { Link } from "react-router-dom";
import { HomeHeader } from "../layouts/HomeHeader";

export const HomePage:ComponentType<{}>  = () => {
   
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
                {navigationItems.map(({title, path}, index) => <Link to={path} key={index}><HomeButton key={index} title={title} /></Link>)}
            </div>
        </ React.Fragment>
    )
}
import React, { ComponentType } from "react"
import { HomeButton } from "../ui-elements/HomeButton";
import '../../index.css';
import { InfoDeskButton } from "../ui-elements/InfoDeskButton";
import countries from "../../constants/countries";
import { navigationItems } from "../../constants/navigation";
import { Link } from "react-router-dom";

export const HomePage:ComponentType<{}>  = () => {
    const country = countries.find(({code}) => code === 'am')

    const menuStyle:React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
    }
    
    const sectStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
    }

    return (
        <React.Fragment>
            <section style={sectStyle}>
                <div>
                <InfoDeskButton
                    text={"Vahan"} 
                    className="avatar-desk" 
                    icon="/assets/images/avatars/4.png"
                    action={{actionIcon: country?.flag || "", clickCallback: (e)=> console.log(e)}}/>
                </div>
                <div style={{display:'flex'}}>
                    <InfoDeskButton 
                        text="400" 
                        icon="/assets/images/home/energy.png"
                        action={{actionIcon: "/assets/images/home/plus.png", clickCallback: (e)=> console.log(e)}}/>
                    <InfoDeskButton 
                        text="400" 
                        icon="/assets/images/home/coin.png"
                        action={{actionIcon: "/assets/images/home/plus.png", clickCallback: (e)=>console.log(e)}}/>
                </div>
            </section>
            <div className="home-menu" style={menuStyle}>
                {navigationItems.map(({title, path}, index) => <Link to={path}><HomeButton key={index} title={title} /></Link>)}
            </div>
        </ React.Fragment>
    )
}
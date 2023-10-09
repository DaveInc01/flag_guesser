import { Countries } from "../../constants/countries";
import { InfoDeskButton } from "../ui-elements/InfoDeskButton";

const country = Countries.find(({code}) => code === 'am')
    
const sectStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
}

export const HomeHeader = () => 
(
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
)
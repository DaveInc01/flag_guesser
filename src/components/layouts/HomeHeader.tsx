import { Fragment, useState } from "react";
import { Countries } from "../../constants/countries";
import { InfoDeskButton } from "../ui-elements/InfoDeskButton";
import { AvatarModal } from "../modals/Avatar";
import { useAppSelector } from "../../app/hooks";
import { AppLogo } from "../ui-elements/AppLogo";
import { MaxScore } from "../ui-elements/MaxScore";
import { selectorCoins, selectorEnergy, selectorMaxScore, selectorUsername } from "../../features/user/userSelector";

const country = Countries.find(({code}) => code === 'am')
    
const sectStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
}

export const HomeHeader = () => {
   const coins = useAppSelector(selectorCoins);
   const username = useAppSelector(selectorUsername);
   const energy = useAppSelector(selectorEnergy);
   const maxScore = useAppSelector(selectorMaxScore);
   const [openAvatarMenu, setOpenAvatarMenu] = useState<boolean>(false);

return (
    <Fragment>
        <section style={sectStyle}>
            <div>
                <InfoDeskButton
                    text={username.toString()} 
                    className="avatar-desk" 
                    icon="/assets/images/avatars/abc-warriors-characters/black-blood.png"
                    action={{
                        actionIcon: country?.flag || "", 
                        onClickLeftIcon: () =>  setOpenAvatarMenu(!openAvatarMenu)
                    }}/>
            </div>
            <div style={{display:'flex'}}>
                <InfoDeskButton 
                    text={energy.toString()} 
                    icon="/assets/images/home/energy.png"
                    action={{actionIcon: "/assets/images/home/plus.png", onClickRightIcon: (e)=> console.log(e)}}/>
                <InfoDeskButton 
                    text={coins.toString()}
                    icon="/assets/images/home/coin.png"
                    action={{actionIcon: "/assets/images/home/plus.png", onClickRightIcon: (e)=>console.log(e)}}/>
            </div>
        </section>
        <AppLogo text="FlagGuesser" />
        <MaxScore text={`max score: ${maxScore}`} className="home-max-score"/>
        {openAvatarMenu && <AvatarModal onDissmis={() => setOpenAvatarMenu(!openAvatarMenu)}/>}
    </Fragment>
)}
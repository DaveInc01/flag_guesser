import { Fragment, useState } from "react";
import { Countries } from "../../constants/countries";
import { InfoDeskButton } from "../ui-elements/InfoDeskButton";
import { AvatarModal } from "../modals/Avatar";
import { wallet } from "../../services/wallet";
const country = Countries.find(({code}) => code === 'am')
    
const sectStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
}

export const HomeHeader = () => {
const [openAvatarMenu, setOpenAvatarMenu] = useState<boolean>(false);
const [coins, setCoins] = useState<number>(wallet.coins)
return (
    <Fragment>
        <section style={sectStyle}>
            <div>
                <InfoDeskButton
                    text={"Vahan"} 
                    className="avatar-desk" 
                    icon="/assets/images/avatars/abc-warriors-characters/black-blood.png"
                    action={{
                        actionIcon: country?.flag || "", 
                        onClickLeftIcon: () =>  setOpenAvatarMenu(!openAvatarMenu)
                    }}/>
            </div>
            <div style={{display:'flex'}}>
                <InfoDeskButton 
                    text="400" 
                    icon="/assets/images/home/energy.png"
                    action={{actionIcon: "/assets/images/home/plus.png", onClickRightIcon: (e)=> console.log(e)}}/>
                {/* <InfoDeskButton 
                    text={coins}
                    icon="/assets/images/home/coin.png"
                    action={{actionIcon: "/assets/images/home/plus.png", clickCallback: (e)=>console.log(e)}}/> */}
            </div>
        </section>
        {openAvatarMenu && <AvatarModal onDissmis={() => setOpenAvatarMenu(!openAvatarMenu)}/>}
    </Fragment>
)}
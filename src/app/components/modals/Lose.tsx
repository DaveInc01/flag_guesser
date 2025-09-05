'use client';
import { paths } from "../../constants/paths"
import { useRouter } from "next/navigation";
import { HomeButton } from "../ui-elements/HomeButton"
import { CSSProperties, Fragment, useState } from "react"
import { MaxScore } from "../ui-elements/MaxScore";
import { RewardCoins } from "../ui-elements/RewardCoins";
import '../../style/Modal.css'
import path from "path";

const filterStyle: CSSProperties = {
    zIndex: '0!important',
    backgroundColor: '#00000047!important', 
}
export const LoseModal = ({score, callBack}:{score: number, callBack:Function })=> {

const [dismiss, setDismiss] = useState<boolean>(false);
const router = useRouter();
const navigate = (path: string) => router.push(path);
 
return (
    <Fragment>
        {!dismiss && <div className="screen-filter" style={filterStyle}></div>}
        
        <div className="modal-style">
            <MaxScore text={`Score: ${score}`} className={"play-score"} />
            <RewardCoins coins={score * 5}/>
            <div>
                <HomeButton title="Replay" onClick={() => {
                    setDismiss(true);
                    callBack();
                    // window.location.reload();
                    return paths.play;
                }} />
                <HomeButton title="Quit" onClick={() => {
                    setDismiss(true);
                    navigate(paths.Home);
                    return paths.home
                }}/>
            </div>
        </div>
    </Fragment>
)}
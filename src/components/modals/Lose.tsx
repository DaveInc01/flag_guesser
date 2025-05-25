import { paths } from "../../constants/paths"
import { useNavigate } from "react-router-dom";
import { HomeButton } from "../ui-elements/HomeButton"
import { CSSProperties, Fragment, useState } from "react"
import { MaxScore } from "../ui-elements/MaxScore";
import { RewardCoins } from "../ui-elements/RewardCoins";
import '../../../src/style/Modal.css'

const filterStyle: CSSProperties = {
    zIndex: '0!important',
    backgroundColor: '#00000047!important', 
}
export const LoseModal = ({score, callBack}:{score: number, callBack:Function })=> {

const [dismiss, setDismiss] = useState<boolean>(false);
const navigate = useNavigate();
 
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
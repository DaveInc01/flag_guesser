import { paths } from "../../constants/paths"
import { useNavigate } from "react-router-dom";
import { HomeButton } from "../ui-elements/HomeButton"
import { CSSProperties, Fragment, useState } from "react"
import { MaxScore } from "../ui-elements/MaxScore";
import { RewardCoins } from "../ui-elements/RewardCoins";

const modalStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    color: "white",
    padding: "3rem",
    fontSize: "30px",
    textAlign: "center",
    borderRadius: "26px",
    background: "#2c2c2c",
    boxShadow: "1px 0px 2px #554634",
    transform: "translate(-50%, -50%)",
}
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
        
        <div style={modalStyle}>
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
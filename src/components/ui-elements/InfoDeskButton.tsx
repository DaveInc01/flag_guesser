import { CSSProperties, MouseEvent, useEffect } from "react"
import { NumberAnimation } from "../animations/NumberAnimation"
import { ISounds } from "../../constants/media"

type IInfoDeskButton = {
    icon: string, 
    text: string,
    className?: string,
    noneDesk?: boolean,
    action?: {
        actionIcon: string, 
        onClickLeftIcon?: (ev: MouseEvent<HTMLElement>)=>void, 
        onClickRightIcon?: (ev: MouseEvent<HTMLElement>)=>void}
}

const WithDeskStyle:CSSProperties ={
    backgroundColor: "rgb(119, 66, 26)",
    border: "4px solid rgb(187, 106, 41)",
    boxShadow: "rgb(100, 68, 29) 0px 5px",
    display: "inline-flex",
    margin: "6px",
    borderRadius: "30px",
    alignItems: "center",
    fontFamily: "DelaGothicOne",
    color: "rgb(255, 255, 250)",
    minWidth: '8rem',
}

const InfoDeskStyle:CSSProperties ={
    display: "inline-flex",
    width: '100%',
    justifyContent: 'end',
    paddingRight: '15px',
    margin: "6px",
    borderRadius: "30px",
    alignItems: "center",
    fontFamily: "DelaGothicOne",
    color: "rgb(255, 255, 250)",
}

const textStyle:CSSProperties = {
    margin: "0 8px",
    fontSize: "15px",
    maxWidth: "95px",
    textAlign: "center"
  }


const InfoDeskButtonStyle:CSSProperties = {
    width: "40px", 
    padding: "4px",
    cursor: "pointer"
}

export const InfoDeskButton = ({
        icon, 
        text, 
        className,
        noneDesk,
        action,
    }:IInfoDeskButton) => {

   return (
    <div style={noneDesk ? InfoDeskStyle : WithDeskStyle}>
        <span>
            <img style={InfoDeskButtonStyle} src={icon} onClick={action?.onClickLeftIcon}/>
        </span>
        <span style={textStyle}>
            {text}
        </span>
        {action?.actionIcon && <span>
            <img style={InfoDeskButtonStyle} src={action.actionIcon} onClick={action?.onClickRightIcon}/>
        </span>}
    </div>
   )
}
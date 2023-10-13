import { CSSProperties, MouseEvent } from "react"

type IInfoDeskButton = {
    icon: string, 
    text: string,
    className?: string,
    action?: {
        actionIcon: string, 
        onClickLeftIcon?: (ev: MouseEvent<HTMLElement>)=>void, 
        onClickRightIcon?: (ev: MouseEvent<HTMLElement>)=>void}
}

const InfoDeskStyle:CSSProperties ={
    backgroundColor: "rgb(119, 66, 26)",
    border: "4px solid rgb(187, 106, 41)",
    boxShadow: "rgb(100, 68, 29) 0px 5px",
    display: "inline-flex",
    margin: "6px",
    borderRadius: "30px",
    alignItems: "center",
    fontFamily: "DelaGothicOne",
    color: "rgb(255, 255, 250)"
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
        action,
    }:IInfoDeskButton) => {
        
   return (
    <div style={InfoDeskStyle} className={className}>
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
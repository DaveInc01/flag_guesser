import { Fragment, useState } from "react"
import { AvatarGroups } from "../../constants/avatars"
import { AvatarItem } from "../ui-elements/AvatarItem"

const modalStyle: React.CSSProperties = {
    zIndex: 4,
    top: "50%",
    left: "50%",
    width: '80%',
    marginLeft: 5,
    marginRight: 5, 
    color: "white",
    padding: "20px",
    height: "400px",
    position: 'fixed',
    overflowY: 'scroll',
    borderRadius: "20px",
    justifyContent: "center",
    fontFamily: "DelaGothicOne",
    backgroundColor: "#222228",
    transform: "translate(-50%, -50%)",
    border: "4px solid rgb(187, 106, 41)",
    boxShadow: "rgb(100, 68, 29) 0px 5px",
  }
  
  const modalItemStyle: React.CSSProperties = {
    justifyContent: 'start',
    flexWrap: 'wrap',
    marginBottom: 35,

  }

  const filterStyle: React.CSSProperties = {
    zIndex: '0',
    backgroundColor: '#0000006b', 
  }

  const itemTitleStyle: React.CSSProperties = {
    textTransform: "capitalize",
    background: "#822121",
    padding: "6px",
    borderRadius: "5px"
  }
export const AvatarModal = ({onDissmis}:{onDissmis: () => void}) => {
    return <Fragment>
       <div className="screen-filter" onClick={onDissmis} style={filterStyle}></div>
        <div className="menu-avatar" style={modalStyle}>
            {Object.keys(AvatarGroups).map((groupName, groupIndex) => <div style={modalItemStyle}>
              <h2 className="menu-item-title" style={itemTitleStyle}>{groupName}</h2>
                <div>
                    {AvatarGroups[groupName].map(({src, title, rerityLeve}, index) => <AvatarItem opt={{locked: !!index || !!groupIndex}} avatar={{rerityLeve, src, title}} />)}
                </div>
            </div>)}
        </div>
    </Fragment>
}
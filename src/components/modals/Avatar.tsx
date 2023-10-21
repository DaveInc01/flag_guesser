import { CSSProperties, Fragment, useEffect, useRef, useState } from "react"
import { AvatarGroups } from "../../constants/avatars"
import { AvatarItem } from "../ui-elements/AvatarItem"
import { ButtonIcon } from "../ui-elements/ButtonIcon"
import '../../style/AvatarModal.css'
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web'
import { useAppSelector } from "../../app/hooks"
import { selectorUser } from "../../features/user/userSelector"

const modalStyle: React.CSSProperties = {
    zIndex: 4,
    top: "50%",
    left: "50%",
    width: '80%',
    marginLeft: 5,
    marginRight: 5, 
    color: "white",
    padding: "20px 0",
    height: "80%",
    position: 'absolute',
    overflow: 'hidden',
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
    width: 800,
    display: 'inline-block',
    padding: '0 20px'
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
  const ref = useRef<HTMLDivElement>(null);
  const groups = Object.keys(AvatarGroups);
  const {
    userItems:{avatarIds}
  } = useAppSelector(selectorUser)
  const [modalSizes, setModalSizes] = useState<{width: number, height: number}>({width: 0, height: 0});
  const [activeIndex, setActiveIndex] = useState<number>(0);

  let slideAnimation = useSpring({
    from: {x: 0},
    to: {x: activeIndex * -modalSizes.width},
  })
  
  console.log("clientWidth: ", modalSizes.width)

  useEffect(() => {
      setModalSizes({
        width: ref.current?.clientWidth || 0,
        height: ref.current?.clientHeight || 0,
      })
  }, [])

  const setSlide = (isNext: boolean) => {
    let index = isNext ? activeIndex+1 : activeIndex-1;
    if(groups[index]) setActiveIndex(index);
  }
    return <Fragment>
       <div className="screen-filter" onClick={onDissmis} style={filterStyle}></div>
        <div ref={ref} className="menu-avatar" style={{ ...modalStyle}}>
            <ButtonIcon className="modal-btn forward-left" icon="/assets/images/icons/forward-left.svg" clickCallback={() => setSlide(false)}/>
              <div className="modal-content" >
                  {groups.map((groupName, groupIndex) => 
                  <animated.div style={slideAnimation} key={groupIndex}>
                      <div style={{...modalItemStyle, width: modalSizes.width}}>
                        <h2 className="menu-item-title" style={itemTitleStyle}>{groupName}</h2>
                          <div style={{marginRight: 50, marginLeft: 50, overflowY: 'scroll', height: modalSizes.height - 70}}>
                              {AvatarGroups[groupName].map(({_id, src, title, rerityLeve, frameTheam}, index) => <AvatarItem key={index} opt={{locked: !avatarIds.includes(_id)}} avatar={{_id, rerityLeve, src, title, frameTheam}} />)}
                          </div>
                      </div>
                  </animated.div>
                  )}
              </div>
            <ButtonIcon className="modal-btn forward-right" icon="/assets/images/icons/forward-right.svg" clickCallback={() => setSlide(true)}/>
        </div>
    </Fragment>
}
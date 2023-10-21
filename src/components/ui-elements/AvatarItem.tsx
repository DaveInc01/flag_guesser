import { CSSProperties } from "react";
import { FrameTheams, IAvatars, LevelTypes } from "../../constants/avatars"
import '../../style/AvatarItem.css';

export const AvatarItem = ({avatar: {src, title, rerityLeve, frameTheam = FrameTheams.dark}, opt: {locked}}: {avatar: IAvatars[number][number], opt: {locked: boolean}}) => {
    const {level4, level5, level6} = LevelTypes;
    const lockedSrc = '/assets/images/icons/locked.png';
    const picture = !locked ? src : lockedSrc;
    const pictureClassName = !locked ? 'avatar-picture' : 'avatar-picture locked';
    const avatarNameClassName = !locked ? 'avatar-name' : 'avatar-name locked';
    const frameClassName = !locked ? 'avatar-frame' : 'avatar-frame locked';
    const frameStyle:CSSProperties = {backgroundColor: !locked ? frameTheam : FrameTheams.dark}
    const isShine = rerityLeve.title == level4 || 
    
    rerityLeve.title == level5 || 
    rerityLeve.title == level6;
    
    return <div className="avatar-item" style={frameStyle}>
        {isShine && <span className="shine"></span>}
        <img className={frameClassName} src={rerityLeve.src} />
        <img className={pictureClassName} src={picture} alt={title} />
        <span className={avatarNameClassName}>{title}</span>
    </div>
}
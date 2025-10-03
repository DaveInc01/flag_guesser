import styles from './styles/PlayHeader.module.css'
import { CSSProperties, useEffect, useState, useRef } from "react";
import { playSound, stopSound } from "@/app/features/services/audio";
import { ISounds } from "../../constants/media";
import { selectorAviableHearts, selectorIsSoundsOn, selectorTime } from '@/app/features/user/userSelector';
import { useAppSelector } from '@/app/hooks';
import { useRouter } from "next/navigation";
import { paths } from '@/app/constants/paths';
import { ButtonIcon } from './ButtonIcon';
import { PlayTimer } from './PlayTimer';
import { InfoDeskButton } from './InfoDeskButton';
import { Hearts } from './Hearts';
import { GameConfig } from '@/app/constants/game-config';
import { selectorEnergy, selectorMaxScore,} from "../../features/user/userSelector";

export const PlayHeader = ({stopTimerInterval}: any) => {   
    const router = useRouter()
    const timerSound = useRef<HTMLAudioElement | null>(null);
    const isSoundsOn = useAppSelector<boolean>(selectorIsSoundsOn);
    const energy = useAppSelector(selectorEnergy);
    const aviableHearts = useAppSelector(selectorAviableHearts)
    const time = useAppSelector(selectorTime)

    const [hearts, setHearts] = useState<number>(GameConfig.parameters.hearts);
    
    const backBtnClick = () => {
        stopTimerInterval()
        if (timerSound.current) {
          stopSound(timerSound.current);
        }
        playSound(ISounds.button, isSoundsOn).then(() => router.push(paths.Home));
    };

    return(
        <header className={styles.header}>
            <ButtonIcon
            icon="/assets/images/icons/forward-left.svg"
            clickCallback={backBtnClick}
            />
            <PlayTimer currentTime={time} />
            <div>
            <InfoDeskButton
                text={energy.toString()}
                icon="/assets/images/home/energy.png"
                isPlusButton={false}
                noneDesk={true}
            />
            <Hearts maxCount={GameConfig.parameters.hearts} count={aviableHearts} />
            </div>
        </header>
    )
}
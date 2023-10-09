import { useEffect, useState } from "react"
import './PlayTimer.css';
export const PlayTimer = ({startTime, onFinish}:{startTime: number, onFinish: () => void})=>{
    const [timeLeft, setTimeLeft] = useState<number>(startTime)
    const pad = (n:number) => n < 10 ? `0${n}` : n;

    useEffect(() => {
        var timeout = setTimeout(() => {
            if(timeout) 
                clearTimeout(timeout); 
            if(timeLeft) 
                setTimeLeft(timeLeft-1); 
            else
                onFinish();
        }, 1000)
      }, [timeLeft]);

    return (
        <div className="timer">
            <img className="timer-logo" src="/assets/images/icons/timer.png" />
            <span className="timer-time">00:{pad(timeLeft)}</span>     
        </div>
    )
}
import '../../style/PlayTimer.css';

export const PlayTimer = ({currentTime}:{currentTime: number})=>{
    const style = {color: currentTime <= 5 ? '#fe6363' : ''}
    const pad = (n:number) => n < 10 ? `0${n}` : n;
    
    return (
        <div className="timer">
            <img className="timer-logo" src="/assets/images/icons/timer.png" />
            <span className="timer-time" style={style}>00:{pad(currentTime)}</span>     
        </div>
    )
}
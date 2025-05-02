import { random, shuffle } from 'lodash';
import { LoseModal } from "../modals/Lose";
import { paths } from "../../constants/paths";
import { Hearts } from "../ui-elements/Hearts";
import { Container } from "../layouts/Container";
import { ICardFlag } from "../ui-elements/CardFlag";
import { PlayContent } from "../layouts/PlayContent";
import { PlayTimer } from "../ui-elements/PlayTimer";
import { ButtonIcon } from "../ui-elements/ButtonIcon";
import { GameConfig } from "../../constants/game-config";
import { CSSProperties, useEffect, useState } from "react";
import { ICountry, Countries } from "../../constants/countries";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { decrementEnergy, incrementCoins, incrementMaxScore } from '../../features/user/userSlice';
import { selectorEnergy, selectorMaxScore } from '../../features/user/userSelector';
import { InfoDeskButton } from '../ui-elements/InfoDeskButton';
import { selectorSounds } from "../../features/user/userSelector";
import { playSound } from "../../services/audio";
import { ISounds } from '../../constants/media';
import { useNavigate } from 'react-router-dom';

const headerStyle:CSSProperties = {
    display:'flex', 
    paddingTop: '20px',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '25px',
    justifyContent: 'space-between', 
}

const noneDesk:CSSProperties = {
    backgroundColor: '#1e384a!important',
    border: 'none!important',
    boxShadow: '#1e384a 0px 0px!important'
}

function removeSolves(countries: ICardFlag['country'][], solvedCountryNames: ICountry['name'][]): ICardFlag['country'][]{
    return countries.filter(({name}) => !solvedCountryNames.includes(name));
}

function makeFourCountries(
    countries: ICardFlag['country'][], 
    solvedCountryNames: ICountry['name'][]
    ): ICardFlag['country'][] {
    let filtred = shuffle(removeSolves(countries, solvedCountryNames));
    let rand: number = random(0, filtred.length - 5);

    return filtred.slice(rand, rand + 4);
}

function makeRightCountryName(_countries: ICountry[]): ICountry['name']{
    return _countries[random(0, _countries.length - 1)]?.name || '';
}

function getCountriesWithEmptyClassess(countries: ICountry[]):ICardFlag['country'][] {
    return countries.map(c => ({...c, className: ''}))
}

export const PlayPage = () => {
    var timeoutTime:NodeJS.Timeout;
    const energy = useAppSelector(selectorEnergy);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const maxScore = useAppSelector(selectorMaxScore)
    const sounds = useAppSelector(selectorSounds)
    const   timerSound = new Audio(ISounds._time)
    const [lose, setLose] = useState<boolean>(false)
    const [disableEvent, setDisableEvent] = useState<boolean>(false);
    const [runEffect, setRunEffect] = useState<boolean>(false);
    const [time, setTime] = useState<number>(GameConfig.parameters.time)
    const [score, setScore] = useState<number>(GameConfig.parameters.score)

    const [hearts, setHearts] = useState<number>(GameConfig.parameters.hearts);
    const [fourCountries, setFourCountries] = useState<ICardFlag['country'][]>(makeFourCountries(getCountriesWithEmptyClassess(Countries), []));
    const [rightCountryName, setRightCountryName] = useState<ICountry['name']>(makeRightCountryName(fourCountries));
    const [solvedCountryNames, setSolvedCountryNames] = useState<ICountry['name'][]>([]);
    const [selectedCountryName, setSelectedCountryName] = useState<ICountry['name']>('');
    
    const stopSound = (audio:HTMLAudioElement)=>{
        audio.pause()
        audio.currentTime = 0;
    }
    const RestartGame = ()=>{
        setLose(false)
        dispatch(decrementEnergy())
        setHearts(GameConfig.parameters.hearts)
        setScore(GameConfig.parameters.score)
        clearTimeout(timeoutTime)
        setTime(GameConfig.parameters.time)
        nextQuestion()
        Promise.resolve(new Promise((r) => setTimeout(() => r(null), 600)))
    }

    const nextQuestion = () => {
        setSolvedCountryNames([...solvedCountryNames, selectedCountryName]);

        const newFourCountries = makeFourCountries(getCountriesWithEmptyClassess(Countries), solvedCountryNames)
        const newRightCountryName = makeRightCountryName(newFourCountries);

        setFourCountries(newFourCountries);

        setRightCountryName(newRightCountryName);   
        setDisableEvent(false)
    }

    const onTimerStart = () => {
        timeoutTime = setTimeout(() => {
            if(timeoutTime) clearTimeout(timeoutTime); 
            if(time && !lose) setTime(time => time - 1);
            if(!time && !lose) onTimeIsUp();
        }, 1000)
    }

    const onTimerRestart = () => {
        clearTimeout(timeoutTime)
        setTimeout(()=>{
            if (time != GameConfig.parameters.time)
                setTime(GameConfig.parameters.time)
            else
                setRunEffect(!runEffect)
            nextQuestion();
        }, 2000)
    }

    const onTimerClear = () => {
        clearTimeout(timeoutTime)
        setTime(0);
    }

    const onTimeIsUp = () => {
        stopSound(timerSound)
        playSound(ISounds.wrong, sounds).then(()=>{
            if(!lose){
                setTime(GameConfig.parameters.time);
                if (hearts) setHearts(hearts - 1)
                nextQuestion();
            }
        })
    }
    
    const onSelect = (selectedCountryName: ICountry['name']) => {
        if(!lose) 
            onTimerRestart();
        if(lose) 
            onTimerClear();
        setSelectedCountryName(selectedCountryName);

        setDisableEvent(true)

        const isCorrectAnswer =  selectedCountryName === rightCountryName;

        if (isCorrectAnswer){
            stopSound(timerSound)
            playSound(ISounds.correct, sounds).then(()=>{
                setScore(score + 1)
            })
        } 
        if (!isCorrectAnswer && hearts){
            stopSound(timerSound)
            playSound(ISounds.wrong, sounds).then(()=>{
                setHearts(hearts - 1);
            })
        } 

        setFourCountries(fourCountries.map(c => {
            if(c.name === rightCountryName) return {...c, className: 'card-success'}
            if(selectedCountryName === c.name && !isCorrectAnswer) return {...c, className: 'card-danger'}
            return c;
        }));
    }

    useEffect(() => {
        if(!hearts) {
            setLose(true);
            if(score > maxScore) dispatch(incrementMaxScore(score))
            dispatch(incrementCoins(score * 5))
        }
    }, [hearts]);

    useEffect(() => {
        if (time === 3){
            if(sounds)
                timerSound.play().catch(e => console.log(e))
        }
        if(!lose)
            onTimerStart();
        if(lose)
            onTimerClear();
        return () => {
            if (timeoutTime) clearTimeout(timeoutTime);
        }
    }, [time, runEffect]);

    const backBtnClick = ()=>{
        stopSound(timerSound)
        playSound(ISounds.button, sounds).then(() => navigate(paths.Home))
    }

return (
    <div>
        <Container>
            <header style={headerStyle}>
                <ButtonIcon icon="/assets/images/icons/forward-left.svg" clickCallback={backBtnClick}/>
                <PlayTimer currentTime={time} />
                <div>
                    <InfoDeskButton 
                        text={energy.toString()} 
                        icon="/assets/images/home/energy.png"
                        isPlusButton={false}
                        noneDesk={true} 
                    />
                    <Hearts maxCount={5} count={hearts}/>
                </div>
            </header>
            <PlayContent
                style={{pointerEvents:disableEvent || lose ?'none':'all'}} 
                score={score}
                rightCountryName={rightCountryName} 
                onSelect={(cName: ICountry['name']) => onSelect(cName)} 
                onSetScore={() => {}}
                onTimeUp={() => {}}
                countries={fourCountries}/>
            
            {lose && <LoseModal score={score} callBack={RestartGame} />}
        </Container>
    </div>
)}
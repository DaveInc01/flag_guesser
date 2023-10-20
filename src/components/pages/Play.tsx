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
import  { ICountry, Countries } from "../../constants/countries";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { decrementEnergy, incrementCoins, incrementMaxScore } from '../../features/user/userSlice';
import { selectorEnergy, selectorMaxScore } from '../../features/user/userSelector';
import { InfoDeskButton } from '../ui-elements/InfoDeskButton';
import { selectorSounds } from "../../features/user/userSelector";
import { playSound } from "../../services/audio";
import { ISounds } from '../../constants/media';

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

function removeSolives(countries: ICardFlag['country'][], solvedCountryNames: ICountry['countryName'][]): ICardFlag['country'][]{
    return countries.filter(({countryName}) => !solvedCountryNames.includes(countryName));
}

function makeFourCountries(
    countries: ICardFlag['country'][], 
    solvedCountryNames: ICountry['countryName'][]
    ): ICardFlag['country'][] {
    let filtred = shuffle(removeSolives(countries, solvedCountryNames));
    let rand: number = random(0, filtred.length - 5);

    return filtred.slice(rand, rand + 4);
}

function makeRightCountryName(_countries: ICountry[]): ICountry['countryName']{
    return _countries[random(0, _countries.length - 1)]?.countryName || '';
}

function getCountriesWithEmptyClassess(countries: ICountry[]):ICardFlag['country'][] {
    return countries.map(c => ({...c, className: ''}))
}

export const PlayPage = () => {
    var timeoutTime:NodeJS.Timeout;
    const energy = useAppSelector(selectorEnergy);
    const dispatch = useAppDispatch();
    const maxScore = useAppSelector(selectorMaxScore)
    const sounds = useAppSelector(selectorSounds)
    var   timerSound = new Audio(ISounds._time)
    const [lose, setLose] = useState<boolean>(false)
    const [disableEvent, setDisableEvent] = useState<boolean>(false);
    const [time, setTime] = useState<number>(GameConfig.parameters.time)
    const [score, setScore] = useState<number>(GameConfig.parameters.score)

    const [hearts, setHearts] = useState<number>(GameConfig.parameters.hearts);
    const [fourCountries, setFourCountries] = useState<ICardFlag['country'][]>(makeFourCountries(getCountriesWithEmptyClassess(Countries), []));
    const [rightCountryName, setRightCountryName] = useState<ICountry['countryName']>(makeRightCountryName(fourCountries));
    const [solvedCountryNames, setSolvedCountryNames] = useState<ICountry['countryName'][]>([]);
    const [selectedCountryName, setSelectedCountryName] = useState<ICountry['countryName']>('');
    
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
            if(time && !lose) setTime(time-1)
            if(!time && !lose) onTimeIsUp();
        }, 1000)
    }

    const onTimerRestart = () => {
        clearTimeout(timeoutTime)
        setTimeout(()=>{
            setTime(GameConfig.parameters.time);
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
    
    const onSelect = (selectedCountryName: ICountry['countryName']) => {
        if(!lose) onTimerRestart();
        if(lose) onTimerClear();
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
            if(c.countryName === rightCountryName) return {...c, className: 'card-success'}
            if(selectedCountryName === c.countryName && !isCorrectAnswer) return {...c, className: 'card-danger'}
            return c;
        }));

        var timeout = setTimeout(() => {
            if (timeout) clearTimeout(timeout);
            nextQuestion();
        }, GameConfig.timout.rightAnswer);
    }

    useEffect(() => {
        if(!hearts) {
            setLose(true);
            if(score > maxScore) dispatch(incrementMaxScore(score))
            dispatch(incrementCoins(score * 5))
        }
    }, [hearts]);

    useEffect(() => {
        if (time === 3)
            timerSound.play()
        if(!lose) {
            onTimerStart();
        }
        if(lose) onTimerClear();
    }, [time]);

    const backBtnClick = ()=>{
        stopSound(timerSound)
        playSound(ISounds.button, sounds)
    }

return (
    <div>
        <Container>
            <header style={headerStyle}>
                <ButtonIcon path={paths.Home} icon="/assets/images/icons/forward-left.svg" clickCallback={backBtnClick}/>
                <PlayTimer currentTime={time} />
                <div>
                    <InfoDeskButton 
                        text={energy.toString()} 
                        icon="/assets/images/home/energy.png"
                        noneDesk={true} 
                    />
                    <Hearts maxCount={3} count={hearts}/>
                </div>
            </header>
            <PlayContent
                style={{pointerEvents:disableEvent || lose ?'none':'all'}} 
                score={score}
                rightCountryName={rightCountryName} 
                onSelect={(cName: ICountry['countryName']) => onSelect(cName)} 
                onSetScore={() => {}}
                onTimeUp={() => {}}
                countries={fourCountries}/>
            
            {lose && <LoseModal score={score} callBack={RestartGame} />}
        </Container>
    </div>
)}
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

const headerStyle:CSSProperties = {
    display:'flex', 
    paddingTop: '20px',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '25px',
    justifyContent: 'space-between', 
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
    const [lose, setLose] = useState<boolean>(false);
    const [disableEvent, setDisableEvent] = useState<boolean>(false);
    const [time, setTime] = useState<number>(GameConfig.parameters.time)
    const [score, setScore] = useState<number>(GameConfig.parameters.scores);
    const [hearts, setHearts] = useState<number>(GameConfig.parameters.hearts);
    const [fourCountries, setFourCountries] = useState<ICardFlag['country'][]>(makeFourCountries(getCountriesWithEmptyClassess(Countries), []));
    const [rightCountryName, setRightCountryName] = useState<ICountry['countryName']>(makeRightCountryName(fourCountries));
    const [solvedCountryNames, setSolvedCountryNames] = useState<ICountry['countryName'][]>([]);
    const [selectedCountryName, setSelectedCountryName] = useState<ICountry['countryName']>('');

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
        if(!lose){
            setTime(GameConfig.parameters.time);
            if (hearts) setHearts(hearts - 1)
            nextQuestion();
        }
    }
    
    const onSelect = (selectedCountryName: ICountry['countryName']) => {
        if(!lose) onTimerRestart();
        if(lose) onTimerClear();

        setSelectedCountryName(selectedCountryName);

        setDisableEvent(true)

        const isCorrectAnswer =  selectedCountryName === rightCountryName;

        if (isCorrectAnswer) setScore(score + 1)
        if (!isCorrectAnswer && hearts) setHearts(hearts - 1);

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
        if(!hearts) setLose(true);
    }, [hearts]);

    useEffect(() => {
        if(!lose) {
            onTimerStart();
            console.log("onTimerStart")
        }
        if(lose) onTimerClear();
    }, [time]);

    return (
        <div>
            <Container>
                <header style={headerStyle}>
                    <ButtonIcon path={paths.Home} icon="/assets/images/icons/forward-left.svg" clickCallback={() => {}}/>
                    <PlayTimer currentTime={time} />
                    <Hearts maxCount={3} count={hearts}/>
                </header>
                <PlayContent
                    style={{pointerEvents:disableEvent || lose ?'none':'all'}} 
                    score={score}
                    rightCountryName={rightCountryName} 
                    onSelect={(cName: ICountry['countryName']) => onSelect(cName)} 
                    onSetScore={() => {}}
                    onTimeUp={() => {}}
                    countries={fourCountries}/>

                {lose && <LoseModal score={score} />}
            </Container>
        </div>
    )}

import  { ICountry, Countries } from "../../constants/countries";
import { Container } from "../layouts/Container";
import { PlayContent } from "../layouts/PlayContent";
import { InfoDeskButton } from "../ui-elements/InfoDeskButton";
import { ButtonIcon } from "../ui-elements/ButtonIcon";
import { PlayTimer } from "../ui-elements/PlayTimer";
import { paths } from "../../constants/paths";
import { useEffect, useState } from "react";
import { random, shuffle } from 'lodash';
import { ICardFlag } from "../ui-elements/CardFlag";
import { GameConfig } from "../../constants/game-config";

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
    const [score, setScore] = useState<number>(0);
    const [fourCountries, setFourCountries] = useState<ICardFlag['country'][]>(makeFourCountries(getCountriesWithEmptyClassess(Countries), []));
    const [rightCountryName, setRightCountryName] = useState<ICountry['countryName']>(makeRightCountryName(fourCountries));
    const [solvedCountryNames, setSolvedCountryNames] = useState<ICountry['countryName'][]>([]);
    const [disableEvent, setDisableEvent] = useState<boolean>(false)


    const onSelect = (selectedCountryName: ICountry['countryName']) => {
        console.log("CLICK EVENTQQQ")
        setDisableEvent(true)

        const isCorrectAnswer =  selectedCountryName === rightCountryName;

        if (isCorrectAnswer) setScore(score + 1)
        setFourCountries(fourCountries.map(c => {
            if(c.countryName === rightCountryName) return {...c, className: 'card-success'}
            if(selectedCountryName === c.countryName && !isCorrectAnswer) return {...c, className: 'card-danger'}
            return c;
        }));

        var timeout = setTimeout(() => {
            if (timeout) clearTimeout(timeout)
            setSolvedCountryNames([...solvedCountryNames, selectedCountryName]);
            
            console.log("solvedCountryNames: ", solvedCountryNames)
    
            const newFourCountries = makeFourCountries(getCountriesWithEmptyClassess(Countries), solvedCountryNames)
            const newRightCountryName = makeRightCountryName(newFourCountries);
    
            setFourCountries(newFourCountries);
    
            setRightCountryName(newRightCountryName);   
            setDisableEvent(false)
        }, GameConfig.timout.rightAnswer);
    }

    return (
        <div>
            <Container>
            <header style={{display:'flex', justifyContent: 'space-between'}}>
                <ButtonIcon path={paths.Home} icon="/assets/images/icons/forward-left.svg" clickCallback={() => {}}/>
                <PlayTimer startTime={10} onFinish={() => {console.log("ON TIME FINISH")}}/>
                <InfoDeskButton 
                    text="3" 
                    icon="/assets/images/icons/heart.png"/>
            </header>
                <PlayContent
                    style={{pointerEvents:disableEvent?'none':'all'}} 
                    score={score}
                    rightCountryName={rightCountryName} 
                    onSelect={(cName: ICountry['countryName']) => onSelect(cName)} 
                    onSetScore={() => {}}
                    onTimeUp={() => {}}
                    countries={fourCountries}/>
            </Container>
        </div>
    )}

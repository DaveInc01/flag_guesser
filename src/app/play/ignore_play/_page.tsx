"use client";

import { random, shuffle } from "lodash";

import { GameConfig } from "../../constants/game-config";
import { CSSProperties, useEffect, useState, useRef } from "react";
import { ICountry, Countries } from "../../constants/countries";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  decrementEnergy,
  incrementCoins,
  incrementMaxScore,
  setIsCorrectAnswer,
} from "../../features/user/userSlice";
import {
  selectorEnergy,
  selectorMaxScore,
} from "../../features/user/userSelector";

import { selectorSounds } from "../../features/user/userSelector";

import { ISounds } from "../../constants/media";
import "../style/PlayContent.css";
import AuthGuard from "@/app/components/AuthGuard";
import { useRouter } from "next/navigation";
import { ICardFlag } from "@/app/components/ui-elements/CardFlag";
import { playSound } from "@/app/features/services/audio";
import { paths } from "@/app/constants/paths";
import { Container } from "@/app/components/layouts/Container";
import { ButtonIcon } from "@/app/components/ui-elements/ButtonIcon";
import { PlayTimer } from "@/app/components/ui-elements/PlayTimer";
import { InfoDeskButton } from "@/app/components/ui-elements/InfoDeskButton";
import { Hearts } from "@/app/components/ui-elements/Hearts";
import { PlayContent } from "@/app/components/layouts/PlayContent";
import { LoseModal } from "@/app/components/modals/Lose";

const headerStyle: CSSProperties = {
  display: "flex",
  paddingTop: "20px",
  marginLeft: "10px",
  marginRight: "10px",
  marginBottom: "25px",
  justifyContent: "space-between",
};

const noneDesk: CSSProperties = {
  backgroundColor: "#1e384a!important",
  border: "none!important",
  boxShadow: "#1e384a 0px 0px!important",
};

function removeSolves(
  countries: ICardFlag["country"][],
  solvedCountryNames: ICountry["name"][]
): ICardFlag["country"][] {
  return countries.filter(({ name }) => !solvedCountryNames.includes(name));
}

function makeFourCountries(countries: ICardFlag["country"][], solvedCountryNames: ICountry["name"][]): ICardFlag["country"][] {
  let filtred = shuffle(removeSolves(countries, solvedCountryNames));
  let rand: number = random(0, filtred.length - 5);

  return filtred.slice(rand, rand + 4);
}

function makeRightCountryName(_countries: ICountry[]): ICountry["name"] {
  return _countries[random(0, _countries.length - 1)]?.name || "";
}

function getCountriesWithEmptyClassess(
  countries: ICountry[]
): ICardFlag["country"][] {
  return countries.map((c) => ({ ...c, className: "" }));
}

export default function PlayPage() {
  const timerSound = useRef<HTMLAudioElement | null>(null);
  var timeoutTime: NodeJS.Timeout;
  const energy = useAppSelector(selectorEnergy);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const navigate = (path: string) => router.push(path);
  const maxScore = useAppSelector(selectorMaxScore);
  const sounds = useAppSelector(selectorSounds);
  const [lose, setLose] = useState<boolean>(false);
  const [disableEvent, setDisableEvent] = useState<boolean>(false);
  const [runEffect, setRunEffect] = useState<boolean>(false);
  const [question, setQuestion] = useState<boolean>(false);
  const [time, setTime] = useState<number>(GameConfig.parameters.time);
  const [score, setScore] = useState<number>(GameConfig.parameters.score);
  const [pauseTimer, setPauseTimer] = useState<boolean>(false);
  const [hearts, setHearts] = useState<number>(GameConfig.parameters.hearts);
  const [fourCountries, setFourCountries] = useState<ICardFlag["country"][]>(
    []
  );
  const [rightCountryName, setRightCountryName] =
    useState<ICountry["name"]>("");
  const [solvedCountryNames, setSolvedCountryNames] = useState<
    ICountry["name"][]
  >([]);
  const [selectedCountryName, setSelectedCountryName] =
    useState<ICountry["name"]>("");
  const [isCorrectAnswer, setAnswer] = useState<boolean>(false);

  const stopSound = (audio: HTMLAudioElement) => {
    audio.pause();
    audio.currentTime = 0;
  };
  const RestartGame = () => {
    setLose(false);
    dispatch(decrementEnergy());
    setHearts(GameConfig.parameters.hearts);
    setScore(GameConfig.parameters.score);
    clearTimeout(timeoutTime);
    setTime(GameConfig.parameters.time);
    nextQuestion();
    Promise.resolve(new Promise((r) => setTimeout(() => r(null), 600)));
  };

  const nextQuestion = () => {
    dispatch(setIsCorrectAnswer(null));
    setSolvedCountryNames([...solvedCountryNames, selectedCountryName]);

    const newFourCountries = makeFourCountries(
      getCountriesWithEmptyClassess(Countries),
      solvedCountryNames
    );
    const newRightCountryName = makeRightCountryName(newFourCountries);

    setFourCountries(newFourCountries);

    setRightCountryName(newRightCountryName);
    setDisableEvent(false);
  };

  const onTimerStart = () => {
    timeoutTime = setTimeout(() => {
      if (timeoutTime) clearTimeout(timeoutTime);
      if (time && !lose) setTime((time) => time - 1);
      if (!time && !lose) onTimeIsUp();
    }, 1000);
  };

  const onTimerClear = () => {
    clearTimeout(timeoutTime);
    setTime(0);
  };

  const onTimeIsUp = () => {
    if (timerSound.current) {
      stopSound(timerSound.current);
    }
    playSound(ISounds.wrong, sounds).then(() => {
      if (!lose) {
        if (hearts) {
          setHearts((hearts) => hearts - 1);
          setQuestion(!question);
        }
        setTime(GameConfig.parameters.time);
        // if (hearts) nextQuestion();
      }
    });
  };

  const onSelect = (selectedCountryName: ICountry["name"]) => {
    setSelectedCountryName(selectedCountryName);
    setDisableEvent(true);

    let answer = selectedCountryName === rightCountryName;
    setAnswer(answer);
    if (selectedCountryName !== "") {
      dispatch(setIsCorrectAnswer(answer));
    }
    if (answer) {
      if (timerSound.current) {
        stopSound(timerSound.current);
      }
      playSound(ISounds.correct, sounds).then(() => {
        setScore((score) => score + 1);
      });
      setQuestion(!question);
    } else {
      if (timerSound.current) stopSound(timerSound.current);
      playSound(ISounds.wrong, sounds).then(() => {
        setHearts((hearts) => hearts - 1);
        setQuestion(!question);
      });
    }
    if (hearts) {
      setFourCountries(
        fourCountries.map((c) => {
          if (c.name === rightCountryName)
            return { ...c, className: "card-success" };
          if (selectedCountryName === c.name && !answer)
            return { ...c, className: "card-danger" };
          return c;
        })
      );
    }
  };

  const renderCount = useRef(0);

  useEffect(() => {
    // skip first two renders after useState -> hearts, question
    // console.log("renderCount", renderCount.current)
    console.log("renderCount ", renderCount.current);

    if (renderCount.current < 1) {
      renderCount.current += 1;
      return;
    }
    if (!hearts) {
      setLose(true);
      if (score > maxScore) dispatch(incrementMaxScore(score));
      dispatch(incrementCoins(score * 5));
    } 
    else {
      if (timeoutTime) clearTimeout(timeoutTime);
      setPauseTimer(true);
      timeoutTime = setTimeout(() => {
        if (time != GameConfig.parameters.time)
          setTime(GameConfig.parameters.time);
        else setRunEffect(!runEffect);
        // if(hearts)
        //     nextQuestion();
        setFourCountries(
          fourCountries.map((c) => {
            if (c.name === rightCountryName)
              return { ...c, className: "card-success" };
            if (selectedCountryName === c.name && !isCorrectAnswer)
              return { ...c, className: "card-danger" };
            return c;
          })
        );
        setPauseTimer(false);
        nextQuestion();
      }, 2000);
    }
  }, [question]);

  useEffect(() => {
    if (time === 3 && sounds && timerSound.current) {
      timerSound.current.play().catch((e) => console.log(e));
    }
    if (!lose && !pauseTimer) {
      onTimerStart();
    }
    if (lose) {
      onTimerClear();
    }
    return () => {
      if (timeoutTime) clearTimeout(timeoutTime);
    };
  }, [time, runEffect, pauseTimer]);

  useEffect(() => {
    const initialFour = makeFourCountries(
      getCountriesWithEmptyClassess(Countries),
      []
    );
    const initialRight = makeRightCountryName(initialFour);

    setFourCountries(initialFour);
    setRightCountryName(initialRight);
  }, []);

  useEffect(() => {
    if (!timerSound.current) {
      timerSound.current = new Audio(ISounds._time);
    }
  }, []);

  const backBtnClick = () => {
    if (timerSound.current) {
      stopSound(timerSound.current);
    }
    playSound(ISounds.button, sounds).then(() => navigate(paths.Home));
  };

  return (
    <AuthGuard>
      <div>
        <Container className="play-container">
          <div className="inner-play-container">
            <header style={headerStyle}>
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
                <Hearts maxCount={3} count={hearts} />
              </div>
            </header>
            <PlayContent
              style={{ pointerEvents: disableEvent || lose ? "none" : "all" }}
              score={score}
              rightCountryName={rightCountryName}
              onSelect={(cName: ICountry["name"]) => onSelect(cName)}
              onSetScore={() => {}}
              onTimeUp={() => {}}
              countries={fourCountries}
            />

            {lose && <LoseModal score={score} callBack={RestartGame} />}
          </div>
        </Container>
      </div>
    </AuthGuard>
  );
}

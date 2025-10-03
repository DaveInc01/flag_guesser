"use client";

import "../style/PlayContent.css";
import { Container } from "@/app/components/layouts/Container";

"use";
import { Countries, ICountry } from "../constants/countries";
import { CardFlag } from "../components/ui-elements/CardFlag";
import { MaxScore } from "../components/ui-elements/MaxScore";
import { use, useEffect, useMemo, useRef, useState, CSSProperties } from "react";
import UpFadingAnimation from "../components/animations/UpFadingAnimation";
import { selectorFilteredCountries, selectorIsCorrectAnswer, selectorQuestion, selectorScore, selectorAviableHearts, selectorTime } from "../features/user/userSelector";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getRandomCountries } from "@/app/play/utils";
import { clearAllAnswers, decrementEnergy, decrementTime, setAnswer, setHearts, setLose, setQuestion, setTime } from "@/app/features/user/userSlice";
import { PlayHeader } from "../components/ui-elements/PlayHeader";
import { LoseModal } from "../components/modals/Lose";
import { GameConfig } from "@/app/constants/game-config";


const flagTableStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto auto",
  gridGap: "20px",
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  fontSize: "35px",
  textShadow: "-4px 4px 8px black",
  marginBottom: "50px",
};

type IItemFlag = ICountry & { className: string };

export type IPlayContent = {
  countries: IItemFlag[];
};


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

export default function PlayPage() {
  const dispatch = useAppDispatch();
  let timerIntervalId = useRef<number | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const UpAnimRef = useRef<HTMLDivElement | null>(null);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [upAnim, setUpAnim] = useState<boolean | null>(null);
  const isCorretAnswer = useAppSelector(selectorIsCorrectAnswer);
  const score = useAppSelector(selectorScore);
  let time = useAppSelector(selectorTime)
  const question: ICountry["name"] | null = useAppSelector(selectorQuestion);
  const filteredCountries = useAppSelector(selectorFilteredCountries);
  const aviableHearts = useAppSelector(selectorAviableHearts)
  let componentMountedFlag = useRef<boolean>(false)
  
  const restartGame = () => {
    if(!componentMountedFlag.current){
      console.log("Decrement Energy")
      dispatch(clearAllAnswers())
      dispatch(setLose(false))
      changeQuestion()
      dispatch(decrementEnergy());
      dispatch(setHearts(GameConfig.parameters.hearts))
      dispatch(setTime(GameConfig.parameters.time))
      componentMountedFlag.current = true
    }
  };

  const createTimerInterval= () =>{
    if(timerIntervalId.current) 
      return
    timerIntervalId.current = window.setInterval(()=>{
        console.log("Thick")
        dispatch(decrementTime())
      }, 1000)
  }

  const stopTimerInterval = () =>{
    if(timerIntervalId.current){
      clearInterval(timerIntervalId.current)
      timerIntervalId.current = null
    }
  }

  useEffect(()=>{
    // for restart game work
    if(!aviableHearts)
    {  
      stopTimerInterval()
      componentMountedFlag.current = false
    }
  }, [aviableHearts])

  const changeQuestion = () =>{
      const randomCountries = getRandomCountries(filteredCountries);
      const [question] = getRandomCountries(randomCountries, 1);
      setCountries(randomCountries);
      dispatch(setQuestion(question.name));
      dispatch(setTime(GameConfig.parameters.time))
      stopTimerInterval()
      createTimerInterval()
  }

  useEffect(() => {
    restartGame()
  }, []);

  useEffect(() => {
    if(!time){
      //set wrong anser
      dispatch(setAnswer(''))
    }
  }, [time]); 

  useEffect(() => {
    setUpAnim(isCorretAnswer);
    // isCorretAnswer == null when hasn't choose any variant
    if ((isCorretAnswer != null) && aviableHearts){
      stopTimerInterval()
      setTimeout(()=>{
        console.log("Aviable hearts - ", aviableHearts)
        changeQuestion()
      }, 2000)
    }
  }, [isCorretAnswer]);

  return (
    // <AuthGuard>
      <div>
        <Container className="play-container">
          <div className="inner-play-container">
            <div className="play-content">
                <PlayHeader stopTimerInterval={stopTimerInterval}/>
                  <hr style={{ margin: "20px 0px" }} />
                  <h2 style={titleStyle} ref={titleRef}>
                    {question}
                  </h2>
                  <div ref={UpAnimRef}></div>
                  {upAnim != null &&
                      <UpFadingAnimation isAnswerCorrect={upAnim} />
                  }
                  <div style={{ ...flagTableStyle}}>
                    {countries.map((country, key) => (
                      <CardFlag
                        key={key}
                        country={{
                          ...country,
                          className: '',
                        }}
                      />
                    ))}
                  </div>
                  <MaxScore text={`score: ${score}`} className="play-score" />
                  {
                    !aviableHearts && 
                    <LoseModal score={score} callBack={restartGame} />
                  }
                </div>
          </div>
        </Container>
      </div>
    // </AuthGuard>
  );
}


"use client";

import { random, shuffle } from "lodash";

import "../style/PlayContent.css";
import { ICardFlag } from "@/app/components/ui-elements/CardFlag";
import { Container } from "@/app/components/layouts/Container";
//

"use";
import { Countries, ICountry } from "../constants/countries";
import { CardFlag } from "../components/ui-elements/CardFlag";
import { MaxScore } from "../components/ui-elements/MaxScore";
import { use, useEffect, useMemo, useRef, useState, CSSProperties } from "react";
import UpFadingAnimation from "../components/animations/UpFadingAnimation";
import { selectorAllAnswers, selectorAnswer, selectorFilteredCountries, selectorIsCorrectAnswer, selectorQuestion, selectorScore, selectorIsLose } from "../features/user/userSelector";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getRandomCountries } from "@/app/play/utils";
import { clearAllAnswers, decrementEnergy, setHearts, setLose, setQuestion } from "@/app/features/user/userSlice";
import { count } from "console";
import { PlayHeader } from "../components/ui-elements/PlayHeader";
import { LoseModal } from "../components/modals/Lose";
import { GameConfig } from "@/app/constants/game-config";

///

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
////


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

// function removeSolves(
//   countries: ICardFlag["country"][],
//   solvedCountryNames: ICountry["name"][]
// ): ICardFlag["country"][] {
//   return countries.filter(({ name }) => !solvedCountryNames.includes(name));
// }

// function makeFourCountries(
//   countries: ICardFlag["country"][],
//   solvedCountryNames: ICountry["name"][]
// ): ICardFlag["country"][] {
//   let filtred = shuffle(removeSolves(countries, solvedCountryNames));
//   let rand: number = random(0, filtred.length - 5);

//   return filtred.slice(rand, rand + 4);
// }

// function makeRightCountryName(_countries: ICountry[]): ICountry["name"] {
//   return _countries[random(0, _countries.length - 1)]?.name || "";
// }
  
// function getCountriesWithEmptyClassess(
//   countries: ICountry[]
// ): ICardFlag["country"][] {
//   return countries.map((c) => ({ ...c, className: "" }));
// }



export default function PlayPage() {
  let timeoutTime: NodeJS.Timeout;
  const dispatch = useAppDispatch();

  //
  const [time, setTime] = useState<number>(GameConfig.parameters.time)
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [upAnim, setUpAnim] = useState<boolean | null>(null);
  const UpAnimRef = useRef<HTMLDivElement | null>(null);
  const isCorretAnswer = useAppSelector(selectorIsCorrectAnswer);
  const score = useAppSelector(selectorScore);
  const question: ICountry["name"] | null = useAppSelector(selectorQuestion);
  const filteredCountries = useAppSelector(selectorFilteredCountries);
  const answers = useAppSelector(state => state.user.inGame.allAnswers);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const isLose = useAppSelector(selectorIsLose)
  // const [nextQuestion, setNexquestion] = useState<Boolean | null>(null)

  const restartGame = () => {
    dispatch(clearAllAnswers())
    dispatch(setLose(false))
    changeQuestion()
    dispatch(decrementEnergy());
    dispatch(setHearts(GameConfig.parameters.hearts))
    setTime(GameConfig.parameters.time);
    // Promise.resolve(new Promise((r) => setTimeout(() => r(null), 600)));
  };

  const changeQuestion = () =>{
      const randomCountries = getRandomCountries(filteredCountries);
      const [question] = getRandomCountries(randomCountries, 1);
      setCountries(randomCountries);
      dispatch(setQuestion(question.name));
  }
  // When component is mounted set question and flags
  useEffect(() => {
    restartGame()
  }, []);


  useEffect(() => {
	console.log("Is correct ans - ", isCorretAnswer)
    setUpAnim(isCorretAnswer);
	if (isCorretAnswer != null){
		setTimeout(()=>{
		  changeQuestion()
		  console.log("Correct answer changed")
		}, 2000)
	}
  }, [isCorretAnswer]);

  return (
    // <AuthGuard>
      <div>
        <Container className="play-container">
          <div className="inner-play-container">
            <div className="play-content">
                <PlayHeader/>
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
                  {/* {isLose && <LoseModal score={score} callBack={restartGame} />} */}
                </div>
          </div>
        </Container>
      </div>
    // </AuthGuard>
  );
}


// function dispatch(arg0: { payload: undefined; type: "users/decrementEnergy"; }) {
//   throw new Error("Function not implemented.");
// }


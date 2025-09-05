"use";
import { Countries, ICountry } from "../../constants/countries";
import { CardFlag } from "../ui-elements/CardFlag";
import "../../style/PlayContent.css";
import { MaxScore } from "../ui-elements/MaxScore";
import { use, useEffect, useMemo, useRef, useState } from "react";
import UpFadingAnimation from "../animations/UpFadingAnimation";
import { selectorAnswer, selectorFilteredCountries, selectorIsCorrectAnswer, selectorQuestion, selectorScore } from "../../features/user/userSelector";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getRandomCountries } from "@/app/play/utils";
import { setQuestion } from "@/app/features/user/userSlice";

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

export const PlayContent = () => {
  const dispatch = useAppDispatch();
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [upAnim, setUpAnim] = useState<boolean | null>(null);
  const UpAnimRef = useRef<HTMLDivElement | null>(null);
  const isCorretAnswer = useAppSelector(selectorIsCorrectAnswer);
  const score = useAppSelector(selectorScore);
  const question: ICountry["name"] | null = useAppSelector(selectorQuestion);
  const filteredCountries = useAppSelector(selectorFilteredCountries);
  const answers = useAppSelector(state => state.user.inGame.allAnswers);
  const [countries, setCountries] = useState<ICountry[]>([]);


  useEffect(() => {
    if (!countries.length && !question && filteredCountries.length) {
      const randomCountries = getRandomCountries(filteredCountries);
      const [q] = getRandomCountries(randomCountries, 1);
      setCountries(randomCountries);
      dispatch(setQuestion(q.name));
    }
  }, [countries, question, filteredCountries]);

  useEffect(() => {
    setUpAnim(isCorretAnswer);
  }, [isCorretAnswer]);

  return (
    <div className="play-content">
      <hr style={{ margin: "20px 0px" }} />
      <h2 style={titleStyle} ref={titleRef}>
        {question}
      </h2>
      <div ref={UpAnimRef}></div>
      {upAnim != null &&
        (upAnim ? (
          <UpFadingAnimation isAnswerCorrect={true} />
        ) : (
          <UpFadingAnimation isAnswerCorrect={false} />
        ))}
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
    </div>
  );
};


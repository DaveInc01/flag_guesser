"use client";
import "../../style/CardFlag.css";
import { useEffect, useState } from "react";
import { ICountry } from "../../constants/countries";
import { useSpring, a } from "@react-spring/web";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setAnswer } from "@/app/features/user/userSlice";
import { selectorIsCorrectAnswer } from "@/app/features/user/userSelector";

export type ICardFlag = {
  country: { className: string } & ICountry;
};

const getFlagImageUrl = (name: string) => `/assets/images/each_country/${name
    .toLocaleLowerCase()
    .replace(/ /g, "")}.1.jpg`;


export const CardFlag = ({
  country,
}: ICardFlag) => {
  const dispatch = useAppDispatch();
  const isCorrectAnswer = useAppSelector(selectorIsCorrectAnswer);
  const { name, className, code } = country;
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const closeCard = () => {
    setTimeout(() => {
      setFlipped(false);
    }, 1500);
  }

  const answer = () => {
    // corect answer should be null, otherwise already clicked and delay
    if(isCorrectAnswer === null){
      dispatch(setAnswer(name));
      setFlipped(true);
      closeCard();
    }
  }

  return (
    <div
      className="main-card"
      onClick={answer}
    >
      <a.div
        className="c"
        style={{
          backgroundImage: `url(${getFlagImageUrl(name)})`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
          position: "absolute",
          opacity,
          transform,
          rotateX: "180deg",
        }}
      />
      <a.div
        className={`fi fi-${code} ${className} c`}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      />
    </div>
  );
};

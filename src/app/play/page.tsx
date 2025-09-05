"use client";

import { random, shuffle } from "lodash";

import { GameConfig } from "../constants/game-config";
import { CSSProperties, useEffect, useState, useRef } from "react";
import { ICountry, Countries } from "../constants/countries";
import { useAppSelector, useAppDispatch } from "../hooks";
// import {
//   decrementEnergy,
//   incrementCoins,
//   incrementMaxScore,
//   setLose,
  
   
// } from "../features/user/userSlice";
import {
  selectorEnergy,
  selectorMaxScore,
  selectorIsLose
} from "../features/user/userSelector";

import { selectorSounds } from "../features/user/userSelector";

import { ISounds } from "../constants/media";
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
import { decrementEnergy, setLose } from "../features/user/userSlice";

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

function makeFourCountries(
  countries: ICardFlag["country"][],
  solvedCountryNames: ICountry["name"][]
): ICardFlag["country"][] {
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
  const [score, setScore] = useState<number>(GameConfig.parameters.score);
  const [rightCountryName, setRightCountryName] = useState<ICountry["name"]>("");
  const [hearts, setHearts] = useState<number>(GameConfig.parameters.hearts);
  let timeoutTime: NodeJS.Timeout;
  const [time, setTime] = useState<number>(GameConfig.parameters.time);
  const isLose = useAppSelector(selectorIsLose)
  const dispatch = useAppDispatch();

  const RestartGame = () => {
      setLose(false);
      dispatch(decrementEnergy());
      setHearts(GameConfig.parameters.hearts);
      setScore(GameConfig.parameters.score);
      // clearTimeout(timeoutTime);
      setTime(GameConfig.parameters.time);
      // nextQuestion();
      Promise.resolve(new Promise((r) => setTimeout(() => r(null), 600)));
  };

  return (
    <AuthGuard>
      <div>
        <Container className="play-container">
          <div className="inner-play-container">
            <PlayContent />       
            {isLose && <LoseModal score={score} callBack={RestartGame} />}
          </div>
        </Container>
      </div>
    </AuthGuard>
  );
}


// function dispatch(arg0: { payload: undefined; type: "users/decrementEnergy"; }) {
//   throw new Error("Function not implemented.");
// }


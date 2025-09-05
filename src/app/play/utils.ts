import { random, shuffle } from "lodash";

export const getRandomCountries = <T>(countries: Array<T>, amount = 4): Array<T> => {
  let filtred = shuffle(countries);
  let rand: number = random(0, filtred.length - (amount + 1));

  return filtred.slice(rand, rand + amount);
};

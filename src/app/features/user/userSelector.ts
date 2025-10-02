import { Countries, ICountry } from "@/app/constants/countries";
import { RootState } from "@/app/store";
import { createSelector } from '@reduxjs/toolkit';
import { GameConfig } from "@/app/constants/game-config";

const selectorUser = (state:RootState) => state.user;  
const selectorMaxScore = (state:RootState) => state.user.userItems.maxScore;  
const selectorEnergy = (state:RootState) => state.user.userItems.energy;  
const selectorCoins = (state:RootState) => state.user.userItems.coins;  
const selectorAvatarIds = (state:RootState) => state.user.userItems.avatarIds;  
const selectorUsername = (state:RootState) => state.user.username;  
const selectorIsSoundsOn = (state:RootState) => state.user.settings.sounds;
const selectorIsLose = (state:RootState) => state.user.inGame.isLose;
const selectorQuestion = (state:RootState) => state.user.inGame.question;
const selectorAllAnswers = (state: RootState) => state.user.inGame.allAnswers
const selectorHearts = (state: RootState) => state.user.inGame.hearts
// Find is the correct answer

const selectorScore = createSelector(
    [selectorAllAnswers],
    (allAnswers) => allAnswers.filter(([question,answer]) => question === answer).length
)

const selectorAnswer = (state:RootState) => {
    const findAnswer = [...state.user.inGame.allAnswers]
    .find(([question]) => question === state.user.inGame.question);
    if (findAnswer) {
        return findAnswer[1];
    }
    return null;
};


const selectorIsCorrectAnswer = createSelector(
    [selectorAllAnswers, selectorQuestion], 
    (allAnswers, question) => {
        const findAnswer = [...allAnswers].find(([q]) => q === question);
        if (findAnswer) {
            return findAnswer[1] === question;
        } 
        return null;
    }
)

const selectorFilteredCountries = createSelector(
    [selectorAllAnswers],
    (allAnswers) : ICountry[] =>{
        const questions = allAnswers.map(([question, answer]) => question);
        return Countries.filter(({ name }) => !questions.includes(name));
    }
)

const selectorAviableHearts = createSelector(
    [selectorAllAnswers, selectorScore],
    (allAnswers, score) => {
        return GameConfig.parameters.hearts - (allAnswers.length - score)
    }
)

export  {
    selectorUser,
    selectorMaxScore,
    selectorEnergy,
    selectorCoins,
    selectorAvatarIds,
    selectorUsername,
    selectorIsSoundsOn,
    selectorIsLose,
    selectorQuestion,
    selectorHearts,
    selectorIsCorrectAnswer,
    selectorScore,
    selectorAnswer,
    selectorAllAnswers,
    selectorFilteredCountries,
    selectorAviableHearts
}


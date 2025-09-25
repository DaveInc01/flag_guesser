import { Countries } from "@/app/constants/countries";
import { RootState } from "@/app/store";
import { createSelector } from '@reduxjs/toolkit';

 const selectorUser = (state:RootState) => state.user;  
const selectorMaxScore = (state:RootState) => state.user.userItems.maxScore;  
const selectorEnergy = (state:RootState) => state.user.userItems.energy;  
const selectorCoins = (state:RootState) => state.user.userItems.coins;  
const selectorAvatarIds = (state:RootState) => state.user.userItems.avatarIds;  
const selectorUsername = (state:RootState) => state.user.username;  
const selectorSounds = (state:RootState) => state.user.settings.sounds;
const selectorIsLose = (state:RootState) => state.user.inGame.isLose;
const selectorQuestion = (state:RootState) => state.user.inGame.question;


// Find is the correct answer
const selectorIsCorrectAnswer = (state:RootState) => {
    const findAnswer = [...state.user.inGame.allAnswers]
        .find(([question]) => question === state.user.inGame.question);
    if (findAnswer) {
        return findAnswer[1] === state.user.inGame.question;
    }
    return false;
};

const selectorScore = (state:RootState) => [...state.user.inGame.allAnswers]
    .filter(([question,answer]) => question === answer).length;

const selectorAnswer = (state:RootState) => {
    const findAnswer = [...state.user.inGame.allAnswers]
        .find(([question]) => question === state.user.inGame.question);
    if (findAnswer) {
        return findAnswer[1];
    }
    return null;
};




const selectorAllAnswers = (state: RootState) => {
    return state.user.inGame.allAnswers
}

const selectorFilteredCountries = createSelector(
    [selectorAllAnswers],
    (allAnswers)=>{
        const questions = allAnswers.map(([question, answer]) => question);
        return Countries.filter(({ name }) => !questions.includes(name));
    }
)

export  {
    selectorUser,
    selectorMaxScore,
    selectorEnergy,
    selectorCoins,
    selectorAvatarIds,
    selectorUsername,
    selectorSounds,
    selectorIsLose,
    selectorQuestion,
    selectorIsCorrectAnswer,
    selectorScore,
    selectorAnswer,
    selectorAllAnswers,
    selectorFilteredCountries
}


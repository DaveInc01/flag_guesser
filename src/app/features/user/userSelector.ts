import { Countries } from "@/app/constants/countries";
import { RootState } from "@/app/store";

export const selectorUser = (state:RootState) => state.user;  
export const selectorMaxScore = (state:RootState) => state.user.userItems.maxScore;  
export const selectorEnergy = (state:RootState) => state.user.userItems.energy;  
export const selectorCoins = (state:RootState) => state.user.userItems.coins;  
export const selectorAvatarIds = (state:RootState) => state.user.userItems.avatarIds;  
export const selectorUsername = (state:RootState) => state.user.username;  
export const selectorSounds = (state:RootState) => state.user.settings.sounds;
export const selectorIsLose = (state:RootState) => state.user.inGame.isLose;
export const selectorQuestion = (state:RootState) => state.user.inGame.question;


// Find is the correct answer
export const selectorIsCorrectAnswer = (state:RootState) => {
    const findAnswer = [...state.user.inGame.allAnswers]
        .find(([question]) => question === state.user.inGame.question);
    if (findAnswer) {
        return findAnswer[1] === state.user.inGame.question;
    }
    return false;
};

export const selectorScore = (state:RootState) => [...state.user.inGame.allAnswers]
    .filter(([question,answer]) => question === answer).length;

export const selectorAnswer = (state:RootState) => {
    const findAnswer = [...state.user.inGame.allAnswers]
        .find(([question]) => question === state.user.inGame.question);
    if (findAnswer) {
        return findAnswer[1];
    }
    return null;
};

export const selectorFilteredCountries = (state:RootState) => {
    const answeredQuestions = [...state.user.inGame.allAnswers].map(([q]) => q);
    return Countries.filter(({ code }) => !answeredQuestions.includes(code));
}

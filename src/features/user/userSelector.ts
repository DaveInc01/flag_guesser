import { RootState } from "../../app/store";

export const selectorUser = (state:RootState) => state.user;  
export const selectorMaxScore = (state:RootState) => state.user.userItems.maxScore;  
export const selectorEnergy = (state:RootState) => state.user.userItems.energy;  
export const selectorCoins = (state:RootState) => state.user.userItems.coins;  
export const selectorAvatarIds = (state:RootState) => state.user.userItems.avatarIds;  
export const selectorUsername = (state:RootState) => state.user.username;  
export const selectorSounds = (state:RootState) => state.user.settings.sounds;  
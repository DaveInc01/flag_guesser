import { IUser } from './IUser';
import { AvatarGroups } from '../../constants/avatars';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const name = 'users';
const avatarId = AvatarGroups['abc-warriors-characters'][0]._id;

const initialState:IUser = {
    username: 'johnDoe',
    email: 'johnDoe@gmail.com',
    countryCode: 'us',
    displayedAvatar: avatarId,
    userItems:{
        coins: 50,
        energy: 10,
        avatarIds:[avatarId],
        maxScore: 0,
    },
    settings:{
        sounds: true
    }
};

export const userSlice = createSlice({
    name,
    initialState,
    reducers: {
        createUser: (state, action) => {
            state = action.payload;
        },
        incrementMaxScore: (state, {payload}) => {
            state.userItems.maxScore += payload;
        },
        decrementCoins: (state) => {
            if(state.userItems.coins) state.userItems.coins--;
        },
        incrementEnergy: (state, action) => {
            state.userItems.energy += action.payload;
        },
        decrementEnergy: (state) => {
            if(state.userItems.energy) state.userItems.energy--;
        },
        incrementCoins: (state, action: PayloadAction<number>) =>{
            state.userItems.coins += action.payload;
        },
        toggleSounds: (state, action: PayloadAction<boolean>) => {
            state.settings.sounds = action.payload
        }
    },
  })
  
  export const { 
    createUser, 
    incrementCoins,
    decrementCoins, 
    incrementEnergy,
    incrementMaxScore,
    decrementEnergy,
    toggleSounds } = userSlice.actions;
  
  export default userSlice.reducer;

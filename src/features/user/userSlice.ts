import { IUser } from './IUser';
import { AvatarGroups } from '../../constants/avatars';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSpring } from 'react-spring';
import { useState } from 'react';

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
        maxScore: 0
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
            // if(state.userItems.energy) 
            // {
            //     const [flip, set] = useState(false);
            //     // state.userItems.energy--
            //     const { number } = useSpring({
            //     reset: true,
            //     reverse: flip,
            //     from: { number: state.userItems.energy },
            //     number: state.userItems.energy - 1,
            //     delay: 100,
            //     onRest: () => set(!flip),
            //     });
            // }
        },
        incrementCoins: (state, action: PayloadAction<number>) =>{
            state.userItems.coins += action.payload;
        }
    },
  })
  
  export const { 
    createUser, 
    incrementCoins,
    decrementCoins, 
    incrementEnergy,
    incrementMaxScore,
    decrementEnergy } = userSlice.actions;
  
  export default userSlice.reducer;

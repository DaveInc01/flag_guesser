import { IUser } from './IUser';
import { AvatarGroups } from '../../constants/avatars';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICountry } from '@/app/constants/countries';

const name = 'users';
const avatarId = AvatarGroups['abc-warriors-characters'][0]._id;

const initialState:IUser = {
    username: 'johnDoe',
    email: 'johnDoe@gmail.com',
    countryCode: 'us',
    displayedAvatar: avatarId,
    inGame: {
        question: '',
        answer: '',
        allAnswers: [], // [[question, answer]]
        isLose: false,
    },
    userItems:{
        coins: 50,
        energy: 10,
        avatarIds:[avatarId],
        maxScore: 0,
    },
    settings:{
        sounds: false
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
        },
        setQuestion: (state, action: PayloadAction<string>) => {
            state.inGame.question = action.payload;
        },
        setLose: (state, action:PayloadAction<boolean>)=>{
            state.inGame.isLose = action.payload
        },
        setAnswer: (state, action: PayloadAction<string>) => {
            // console.log(state.inGame.question, 'question...');
            // console.log(action.payload, 'answer...');
            // console.log(`${state.inGame.question}: ${action.payload}`)
            state.inGame.allAnswers.push([state.inGame.question, action.payload]);
            state.userItems.maxScore = state.inGame.allAnswers.filter(([question, answer]) => {
                return question === answer
            }).length
            console.log('score', state.userItems.maxScore)
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
    toggleSounds,
    setAnswer,
    setLose,
    setQuestion,
} = userSlice.actions;
  
  export default userSlice.reducer;

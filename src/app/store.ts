import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userSlice } from './features/user/userSlice';
import { createWrapper } from 'next-redux-wrapper';
import { enableMapSet } from "immer";

enableMapSet();

/**
 * Function that creates the store
 */
export const makeStore = () =>
  configureStore({
    reducer: {
      user: userSlice.reducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });

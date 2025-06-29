import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';

/**
 * Set up all states
 */

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch, type TypedUseSelectorHook } from 'react-redux';
import userSlice from './module/user.js';
import globalSlice from './module/global.js';

const store = configureStore({
  reducer: {
    user: userSlice,
    global: globalSlice,
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
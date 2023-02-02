import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import truckSlice from './truck-slice';
import trucksSlice from './trucks-slice';
import userSlice from './user-slice';

const store = configureStore({
	reducer: {
		truck: truckSlice.reducer,
		trucks: trucksSlice.reducer,
		user: userSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;

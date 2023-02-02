import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TruckParams } from './truck-slice';

interface InitialState {
	trucks: TruckParams[];
}

const initialState: InitialState = {
	trucks: [],
};

const trucksSlice = createSlice({
	name: 'trucks',
	initialState,
	reducers: {
		addTruck(state, action: PayloadAction<TruckParams>) {
			state.trucks = [...state.trucks, action.payload];
		},
	},
});

export const { addTruck } = trucksSlice.actions;

export default trucksSlice;

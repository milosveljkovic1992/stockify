import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TruckParams = {
	id: string;
	from: string;
	to: string;
	weight: number;
	length: number;
};

const initialState: TruckParams = {
	id: '',
	from: '',
	to: '',
	weight: 0,
	length: 0,
};

const truckSlice = createSlice({
	name: 'truck',
	initialState,
	reducers: {
		setTruckParameters(state, action: PayloadAction<TruckParams>) {
			return action.payload;
		},
		resetTruckParameters() {
			return initialState;
		},
	},
});

export const { setTruckParameters, resetTruckParameters } = truckSlice.actions;

export default truckSlice;

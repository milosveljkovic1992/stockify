import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from 'store';
import { addTruck } from './trucks-slice';

export const createTruck = createAsyncThunk(
	'/truck/createTruck',
	async (truck: TruckFormInput, thunkAPI) => {
		try {
			const state = thunkAPI.getState() as RootState;
			const uid = state.user.userDetails._id;

			const { data } = await axios.post<TruckType>('/truck/dispatch', {
				...truck,
				uid,
			});
			thunkAPI.dispatch(addTruck(data));
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue('');
		}
	},
);

export const deleteTruck = createAsyncThunk(
	'/truck/deleteTruck',
	async (id: string, thunkAPI) => {
		try {
			axios.delete(`/truck/delete/${id}`);
		} catch (error) {
			return thunkAPI.rejectWithValue('');
		}
	},
);

export type TruckType = {
	_id: string;
	uid: string;
	origin: string;
	destination: string;
	weight: number;
	length: number;
	createdAt: Date | '';
	updatedAt: Date | '';
	expireAt: Date | '';
};

export type TruckFormInput = Omit<
	TruckType,
	'_id' | 'uid' | 'createdAt' | 'updatedAt' | 'expireAt'
>;

type InitialState = TruckType & { isLoading: boolean };

const initialState: InitialState = {
	_id: '',
	uid: '',
	origin: '',
	destination: '',
	weight: 0,
	length: 0,
	createdAt: '',
	updatedAt: '',
	expireAt: '',
	isLoading: false,
};

const truckSlice = createSlice({
	name: 'truck',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createTruck.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			createTruck.fulfilled,
			(state, action: PayloadAction<TruckType>) => {
				state._id = action.payload._id;
				state.uid = action.payload.uid;
				state.origin = action.payload.origin;
				state.destination = action.payload.destination;
				state.weight = action.payload.weight;
				state.length = action.payload.length;
				state.createdAt = action.payload.createdAt;
				state.updatedAt = action.payload.updatedAt;
				state.expireAt = action.payload.expireAt;
				state.isLoading = false;
			},
		);
		builder.addCase(createTruck.rejected, (state) => {
			state = initialState;
			state.isLoading = false;
		});
	},
});

export default truckSlice;

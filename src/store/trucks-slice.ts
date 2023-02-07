import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store';
import type { TruckType } from './truck-slice';

export const fetchDispatchedTrucks = createAsyncThunk(
	'/trucks/dispatched',
	async (_, thunkAPI) => {
		try {
			const source = axios.CancelToken.source();
			thunkAPI.signal.addEventListener('abort', () => {
				source.cancel();
			});

			const state = thunkAPI.getState() as RootState;
			const uid = state.user.userDetails._id;

			const { data } = await axios<TruckType[]>(`/truck/find/${uid}`, {
				cancelToken: source.token,
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue('');
		}
	},
);

export const deleteDispatchedTruck = createAsyncThunk(
	'/truck/delete',
	async (id: string, thunkAPI) => {
		try {
			await axios.delete(`/truck/${id}`);
			return id;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue('');
		}
	},
);

interface InitialState {
	truckList: TruckType[];
	isLoading: boolean;
}

const initialState: InitialState = {
	truckList: [],
	isLoading: true,
};

const trucksSlice = createSlice({
	name: 'trucks',
	initialState,
	reducers: {
		addTruckToList(state, action: PayloadAction<TruckType>) {
			state.truckList = [...state.truckList, action.payload];
		},
		updateTruckOnList(state, action: PayloadAction<TruckType>) {
			state.truckList = state.truckList.map((truck) =>
				truck._id === action.payload._id ? action.payload : truck,
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDispatchedTrucks.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			fetchDispatchedTrucks.fulfilled,
			(state, action: PayloadAction<TruckType[]>) => {
				state.truckList = action.payload;
				state.isLoading = false;
			},
		);
		builder.addCase(fetchDispatchedTrucks.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(
			deleteDispatchedTruck.fulfilled,
			(state, action: PayloadAction<string>) => {
				const id = action.payload;
				state.truckList = state.truckList.filter((truck) => truck._id !== id);
				state.isLoading = false;
			},
		);
	},
});

export const { addTruckToList, updateTruckOnList } = trucksSlice.actions;

export default trucksSlice;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const createTruck = createAsyncThunk(
	'/truck/createTruck',
	async (truck: TruckWithoutID, thunkAPI) => {
		try {
			const { data } = await axios.post<TruckParams>('/truck/dispatch', truck);
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

export type TruckParams = {
	id: string;
	origin: string;
	destination: string;
	weight: number;
	length: number;
};

export type TruckWithoutID = Omit<TruckParams, 'id'>;

type InitialState = TruckParams & { isLoading: boolean };

const initialState: InitialState = {
	id: '',
	origin: '',
	destination: '',
	weight: 0,
	length: 0,
	isLoading: true,
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
			(state, action: PayloadAction<TruckParams>) => {
				const { id, origin, destination, weight, length } = action.payload;
				state.id = id;
				state.origin = origin;
				state.destination = destination;
				state.weight = weight;
				state.length = length;
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

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { saveUIDtoCookies } from 'utils/saveUIDtoCookies';

type User = {
	username: string;
	email: string;
	role: string;
	_id: string;
};

interface registerUserProps {
	username: string;
	email: string;
	password: string;
}

export const registerUser = createAsyncThunk(
	'/user/registerUser',
	async ({ username, email, password }: registerUserProps, thunkAPI) => {
		try {
			const { data } = await axios.post<User>('/auth/register', {
				username,
				email,
				password,
			});
			saveUIDtoCookies(data._id);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue('');
		}
	},
);

interface loginUserProps {
	username: string;
	password: string;
}

export const loginUser = createAsyncThunk(
	'/user/loginUser',
	async ({ username, password }: loginUserProps, thunkAPI) => {
		try {
			const { data } = await axios.post<User>('/auth/login', {
				username,
				password,
			});
			saveUIDtoCookies(data._id);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue('');
		}
	},
);

export const autoLogin = createAsyncThunk(
	'/user/reauth',
	async (_id: string, thunkAPI) => {
		try {
			const source = axios.CancelToken.source();
			thunkAPI.signal.addEventListener('abort', () => {
				source.cancel();
			});

			const { data } = await axios.post<User>(
				'/auth/reauth',
				{ _id },
				{ cancelToken: source.token },
			);
			saveUIDtoCookies(data._id);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue('');
		}
	},
);

interface InitialState {
	isLoading: boolean;
	userDetails: User;
}

const initialState: InitialState = {
	isLoading: false,
	userDetails: {
		username: '',
		email: '',
		role: '',
		_id: '',
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserDetails(state, action: PayloadAction<User>) {
			state.userDetails = action.payload;
		},
		clearUserDetails(state) {
			state.userDetails = initialState.userDetails;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state) => {
			state.isLoading = false;
		});
		builder.addCase(
			loginUser.fulfilled,
			(state, action: PayloadAction<User>) => {
				state.isLoading = false;
				state.userDetails = action.payload;
			},
		);
		builder.addCase(loginUser.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(registerUser.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			registerUser.fulfilled,
			(state, action: PayloadAction<User>) => {
				state.isLoading = false;
				state.userDetails = action.payload;
			},
		);
		builder.addCase(registerUser.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(autoLogin.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			autoLogin.fulfilled,
			(state, action: PayloadAction<User>) => {
				state.isLoading = false;
				state.userDetails = action.payload;
			},
		);
		builder.addCase(autoLogin.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export const { setUserDetails } = userSlice.actions;

export default userSlice;

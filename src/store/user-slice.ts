import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { saveUIDtoCookies } from 'utils/saveUIDtoCookies';
import { removeUIDfromCookies } from 'utils/removeUIDfromCookies';

export type User = {
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
			const { data } = await axios.post<User>('/auth/reauth', { _id });
			saveUIDtoCookies(data._id);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue('');
		}
	},
);

export const logout = createAsyncThunk('/user/logout', async (_, thunkAPI) => {
	try {
		await axios.get('/auth/logout');
		removeUIDfromCookies();
		return;
	} catch (error) {
		return thunkAPI.rejectWithValue('');
	}
});

interface InitialState {
	isLoading: boolean;
	isLoggedIn: boolean;
	userDetails: User;
}

const initialState: InitialState = {
	isLoading: true,
	isLoggedIn: true,
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
			state.isLoggedIn = true;
			state.isLoading = false;
		},
		setUserIsUnauthenticated(state) {
			state.isLoading = false;
			state.isLoggedIn = false;
			state.userDetails = initialState.userDetails;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state) => {
			state.isLoading = false;
			state.isLoggedIn = false;
		});
		builder.addCase(
			loginUser.fulfilled,
			(state, action: PayloadAction<User>) => {
				state.isLoading = false;
				state.isLoggedIn = true;
				state.userDetails = action.payload;
			},
		);
		builder.addCase(loginUser.rejected, (state) => {
			state.isLoading = false;
			state.isLoggedIn = false;
		});
		builder.addCase(registerUser.pending, (state) => {
			state.isLoading = true;
			state.isLoggedIn = false;
		});
		builder.addCase(
			registerUser.fulfilled,
			(state, action: PayloadAction<User>) => {
				state.isLoading = false;
				state.isLoggedIn = true;
				state.userDetails = action.payload;
			},
		);
		builder.addCase(registerUser.rejected, (state) => {
			state.isLoading = false;
			state.isLoggedIn = false;
		});
		builder.addCase(autoLogin.pending, (state) => {
			state.isLoading = true;
			state.isLoggedIn = false;
		});
		builder.addCase(
			autoLogin.fulfilled,
			(state, action: PayloadAction<User>) => {
				state.isLoading = false;
				state.isLoggedIn = true;
				state.userDetails = action.payload;
			},
		);
		builder.addCase(autoLogin.rejected, (state) => {
			state.isLoading = false;
			state.isLoggedIn = false;
		});
		builder.addCase(logout.pending, (state) => {
			state.isLoading = true;
			state.isLoggedIn = true;
		});
		builder.addCase(logout.fulfilled, (state) => {
			state.isLoading = false;
			state.isLoggedIn = false;
			state.userDetails = initialState.userDetails;
		});
		builder.addCase(logout.rejected, (state) => {
			state.isLoading = false;
			state.isLoggedIn = true;
		});
	},
});

export const { setUserDetails, setUserIsUnauthenticated } = userSlice.actions;

export default userSlice;

import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
	userDetails: {
		[key: string]: string;
	};
}

const initialState: InitialState = {
	userDetails: {},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserDetails(state, action) {
			state.userDetails = action.payload;
		},
	},
});

export const { setUserDetails } = userSlice.actions;

export default userSlice;

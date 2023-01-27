import axios from 'axios';

import { getUIDfromCookies } from './getUIDfromCookies';
import { saveUIDtoCookies } from './saveUIDtoCookies';

import {
	logoutUser,
	setUserDetails,
	setUserIsUnauthenticated,
} from 'store/user-slice';
import type { AppDispatch } from 'store';
import type { User } from 'store/user-slice';

export const preAuthenticate = async (
	controller: AbortController,
	dispatch: AppDispatch,
) => {
	const _id = getUIDfromCookies();

	if (!_id) {
		dispatch(setUserIsUnauthenticated());
	} else {
		try {
			const { data } = await axios.post<User>(
				'/auth/reauth',
				{ _id },
				{ signal: controller.signal },
			);
			saveUIDtoCookies(data._id);
			dispatch(setUserDetails(data));
		} catch (error: any) {
			if (axios.isCancel(error)) return;
			dispatch(logoutUser());
		}
	}
};

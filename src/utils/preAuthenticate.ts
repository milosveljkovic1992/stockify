import axios from 'axios';

import { saveUIDtoCookies } from 'utils/saveUIDtoCookies';

import {
	logoutUser,
	setUserDetails,
	setUserIsUnauthenticated,
} from 'store/user-slice';
import type { AppDispatch } from 'store';
import type { User } from 'store/user-slice';

export const preAuthenticate = async (
	_id: string,
	controller: AbortController,
	dispatch: AppDispatch,
) => {
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

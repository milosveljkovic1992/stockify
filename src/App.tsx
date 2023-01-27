import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';

import { Header } from 'components';
import { PageRoutes } from 'routes/PageRoutes';
import { getUIDfromCookies } from 'utils/getUIDfromCookies';
import { preAuthenticate } from 'utils/preAuthenticate';

import './axios/global';
import './axios/interceptors';

const App = () => {
	const dispatch = useAppDispatch();
	const { isLoading } = useSelector((state: RootState) => state.user);
	const _id = getUIDfromCookies();

	useEffect(() => {
		const controller = new AbortController();
		preAuthenticate(_id, controller, dispatch);

		return () => controller.abort();
	}, []);

	if (isLoading) return <></>;

	return (
		<div className="App">
			<Header />
			<PageRoutes />
		</div>
	);
};

export default App;

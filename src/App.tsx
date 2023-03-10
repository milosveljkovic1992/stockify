import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';

import { Header } from 'components';
import { preAuthenticate } from 'utils/preAuthenticate';

import './axios/global';
import './axios/interceptors';

const App = () => {
	const dispatch = useAppDispatch();
	const { isLoading } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		const controller = new AbortController();
		preAuthenticate(controller, dispatch);

		return () => controller.abort();
	}, []);

	if (isLoading) return <></>;

	return (
		<div className="App">
			<Header />
			<Outlet />
		</div>
	);
};

export default App;

import { useEffect } from 'react';

import { Header } from 'components';
import { PageRoutes } from 'routes/PageRoutes';
import { useAppDispatch } from 'store';
import { autoLogin } from 'store/user-slice';
import { getUIDfromCookies } from 'utils/getUIDfromCookies';

import './axios/global';
import './axios/interceptors';

const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const UIDfromCookies = getUIDfromCookies();
		if (UIDfromCookies) {
			const promise = dispatch(autoLogin(UIDfromCookies));
			return () => promise.abort();
		}
	}, []);

	return (
		<div className="App">
			<Header />
			<PageRoutes />
		</div>
	);
};

export default App;

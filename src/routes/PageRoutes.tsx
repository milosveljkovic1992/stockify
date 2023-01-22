import { Navigate, Route, Routes } from 'react-router-dom';

import { Homepage, RegisterPage } from 'components';

export const PageRoutes = () => {
	const cookies = document.cookie.split(';');
	const uid = cookies.find((cookie) => cookie.includes('_uid'));

	return (
		<Routes location={location}>
			<Route path="/" element={<Homepage />} />
			<Route path="/login" element={<h1>Login</h1>} />
			<Route path="/register" element={<RegisterPage />} />
			<Route
				path="/dashboard"
				element={
					uid ? <h1>Dashboard</h1> : <Navigate to="/login" replace={true} />
				}
			/>
			<Route path="/*" element={<h1>Not found</h1>} />
		</Routes>
	);
};

import { Route, Routes } from 'react-router-dom';

import { Homepage, RegisterPage } from 'components';

export const PageRoutes = () => {
	return (
		<Routes location={location}>
			<Route path="/" element={<Homepage />} />
			<Route path="/login" element={<h1>Login</h1>} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/*" element={<h1>Not found</h1>} />
		</Routes>
	);
};

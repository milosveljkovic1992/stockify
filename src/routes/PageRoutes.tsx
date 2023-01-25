import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { Homepage, LoginPage, RegisterPage } from 'components';

export const PageRoutes = () => {
	const { isLoggedIn } = useSelector((state: RootState) => state.user);

	return (
		<Routes location={location}>
			<Route
				path="/"
				element={
					!isLoggedIn ? (
						<Homepage />
					) : (
						<Navigate to="/dashboard" replace={true} />
					)
				}
			/>
			<Route
				path="/login"
				element={
					!isLoggedIn ? (
						<LoginPage />
					) : (
						<Navigate to="/dashboard" replace={true} />
					)
				}
			/>
			<Route
				path="/register"
				element={
					!isLoggedIn ? (
						<RegisterPage />
					) : (
						<Navigate to="/dashboard" replace={true} />
					)
				}
			/>
			<Route
				path="/dashboard"
				element={
					isLoggedIn ? (
						<h1>Dashboard</h1>
					) : (
						<Navigate to="/login" replace={true} />
					)
				}
			/>
			<Route path="/*" element={<h1>Not found</h1>} />
		</Routes>
	);
};

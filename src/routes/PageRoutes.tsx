import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { Dashboard, Homepage, LoginPage, RegisterPage } from 'components';
import { Warehouse } from 'components/Dashboard/Warehouse/Warehouse';

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
					isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace={true} />
				}
				loader={() =>
					fetch('http://localhost.com:3000')
						.then(() => 'result')
						.catch((error) => error)
				}
			>
				<Route path="warehouse" element={<Warehouse />} />
			</Route>
			<Route path="/*" element={<h1>Not found</h1>} />
		</Routes>
	);
};

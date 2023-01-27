import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'store';

export const UnauthenticatedRoutes = () => {
	const { isLoggedIn } = useSelector((state: RootState) => state.user);

	if (isLoggedIn) {
		return <Navigate to="dashboard" replace={true} />;
	}

	return <Outlet />;
};

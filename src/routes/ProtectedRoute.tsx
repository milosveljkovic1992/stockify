import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const ProtectedRoute = () => {
	const { isLoggedIn } = useSelector((state: RootState) => state.user);

	if (!isLoggedIn) {
		return <Navigate to="/login" replace={true} />;
	}

	return <Outlet />;
};

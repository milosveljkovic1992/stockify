import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { UnauthenticatedRoutes } from './UnauthenticatedRoutes';

import App from 'App';
import { Dashboard, Homepage, LoginPage, RegisterPage } from 'components';
import { Board } from 'components/Dashboard/Board/Board';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <UnauthenticatedRoutes />,
				children: [
					{
						path: '/',
						element: <Homepage />,
					},
					{
						path: 'login',
						element: <LoginPage />,
					},
					{
						path: 'register',
						element: <RegisterPage />,
					},
				],
			},
			{
				path: '/dashboard',
				element: <ProtectedRoute />,
				children: [
					{
						path: '/dashboard',
						element: <Dashboard />,
						children: [
							{
								path: 'board',
								element: <Board />,
							},
						],
					},
				],
			},
		],
	},
]);

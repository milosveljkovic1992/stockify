import { Route, Routes, useLocation } from 'react-router-dom';

import { Homepage, RegisterPage } from 'components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const AnimatedRoutes = () => {
	const location = useLocation();
	return (
		<TransitionGroup>
			<CSSTransition key={location.key} classNames="slide" timeout={200}>
				<Routes location={location}>
					<Route path="/" element={<Homepage />} />
					<Route path="/login" element={<h1>Login</h1>} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/*" element={<h1>Not found</h1>} />
				</Routes>
			</CSSTransition>
		</TransitionGroup>
	);
};

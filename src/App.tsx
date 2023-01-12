import { Route, Routes } from 'react-router-dom';

import { Header } from 'components/Header/Header';

const App = () => {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<h1>Stockify</h1>} />
				<Route path="/login" element={<h1>Login</h1>} />
				<Route path="/register" element={<h1>Register</h1>} />
				<Route path="/*" element={<h1>Not found</h1>} />
			</Routes>
		</div>
	);
};

export default App;

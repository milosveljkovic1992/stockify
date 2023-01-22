import { Header } from 'components';
import { PageRoutes } from 'routes/PageRoutes';
import './axios/global';
import './axios/interceptors';

const App = () => {
	return (
		<div className="App">
			<Header />
			<PageRoutes />
		</div>
	);
};

export default App;

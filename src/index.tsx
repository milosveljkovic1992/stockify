import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { Theme } from 'theme';
import store from 'store';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<Provider store={store}>
			<Router>
				<Theme>
					<App />
				</Theme>
			</Router>
		</Provider>
	</StrictMode>,
);

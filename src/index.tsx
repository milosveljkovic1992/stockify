import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Theme } from 'theme';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<Router>
			<Theme>
				<App />
			</Theme>
		</Router>
	</StrictMode>,
);

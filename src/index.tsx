import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { Theme } from 'theme';
import { router } from 'routes/PageRoutes';
import store from 'store';
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<Provider store={store}>
			<Theme>
				<RouterProvider router={router} />
			</Theme>
		</Provider>
	</StrictMode>,
);

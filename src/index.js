import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import './index.css';

const rootElement = document.getElementById('root');
const isProduction = process.env.NODE_ENV === 'production';

const AppRoot = () => (
	isProduction ? (
		<RouterProvider router={router} />
	) : (
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	)
);

if (rootElement.hasChildNodes()) {
	ReactDOM.hydrateRoot(rootElement, <AppRoot />);
} else {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<AppRoot />);
}

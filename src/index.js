import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { router } from './router';
import './index.css';
import { RouterProvider } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
	ReactDOM.hydrateRoot(
		rootElement,
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>,
	);
} else {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>,
	);
}

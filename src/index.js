import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import './index.css';

const rootElement = document.getElementById('root');

const AppRoot = () => (
	<RouterProvider router={router} />

);

if (rootElement.hasChildNodes()) {
	ReactDOM.hydrateRoot(rootElement, <AppRoot />);
} else {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<AppRoot />);
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { HelmetProvider } from 'react-helmet-async';

// Create the Helmet context for SEO
const helmetContext = {};

// Use ReactDOM.createRoot for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<HelmetProvider context={helmetContext}>
			<RouterProvider router={router} />
		</HelmetProvider>
	</React.StrictMode>,
);

// Add event listener for when the React app has been hydrated on client-side
// This tells crawlers when the page is fully loaded
if (typeof window !== 'undefined') {
	window.onload = () => {
		document.dispatchEvent(new Event('app-rendered'));
	};
}

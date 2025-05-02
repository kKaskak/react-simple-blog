import * as ReactDOM from 'react-dom/client';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { loadScripts } from './utils/scripts';
import './index.css';

const rootElement = document.getElementById('root');

// Simple React Router app with no wrapper complexity
const App = () => <RouterProvider router={router} />;

// Load Google Ads script only in browser environment
loadScripts();

// Only use hydrateRoot when pre-rendered content exists
// This is the case when react-snap has pre-rendered the page
if (rootElement.hasChildNodes()) {
	// Use the same router instance for hydration to properly match routes
	ReactDOM.hydrateRoot(rootElement, <App />);
} else {
	// Fresh render (development mode)
	const root = ReactDOM.createRoot(rootElement);
	root.render(<App />);
}

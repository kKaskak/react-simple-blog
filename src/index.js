import * as ReactDOM from 'react-dom/client';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import './index.css';

const rootElement = document.getElementById('root');

// Simple React Router app with no wrapper complexity
const App = () => <RouterProvider router={router} />;

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

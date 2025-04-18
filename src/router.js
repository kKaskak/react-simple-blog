import { createBrowserRouter } from 'react-router-dom';
import { Contact, Blog, FullArticle, Home } from './pages';
import ErrorElement from './ErrorElement';
import { Root } from './pages/Root';

// Add a custom basename option to help with hydration
// This helps React Router match prerendered URLs from react-snap
export const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorElement />,
		children: [
			{
				path: '/',
				element: <Home />,
				errorElement: <ErrorElement />,
				index: true,
			},
			{
				path: '/blog',
				element: <Blog />,
				errorElement: <ErrorElement />,
			},
			{
				path: '/blog/:slug',
				element: <FullArticle />,
				errorElement: <ErrorElement />,
			},
			{
				path: '/contact',
				element: <Contact />,
				errorElement: <ErrorElement />,
			},
		],
	},
], {
	// This helps with initial route matching during hydration
	future: {
		v7_normalizeFormMethod: true,
	}
});

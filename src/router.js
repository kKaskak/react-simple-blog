import { createBrowserRouter } from 'react-router-dom';
import { Contact, Blog, FullArticle, Header } from './pages';
import ErrorElement from './ErrorElement';
import { Root } from './pages/Root';
import './index.css';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorElement />,
		children: [
			{
				path: '/',
				element: <Header />,
				errorElement: <ErrorElement />,
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
]);

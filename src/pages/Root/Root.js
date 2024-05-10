import { Navbar, PageLayout } from '../../components';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const Root = () => {
	return (
		<PageLayout>
			<Navbar />
			<Outlet />
			<ScrollRestoration />
		</PageLayout>
	);
};

export default Root;

import { Navbar } from '../../components';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const Root = () => {
	return (
		<>
			<ScrollRestoration />
			<Navbar />
			<Outlet />
		</>
	);
};

export default Root;

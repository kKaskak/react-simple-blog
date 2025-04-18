import { Navbar } from '../../components';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const Root = () => {
	return (
		<>
			<ScrollRestoration />
			<Navbar />
			<div id="page-content">
				<Outlet />
			</div>
		</>
	);
};

export default Root;

import './index.css';
import { useNavigate } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

const ErrorElement = () => {
	const navigate = useNavigate();
	const errorResponse = useRouteError();
	const handleNavigate = () => {
		navigate('/');
	};
	return (
		<div className='container--center'>
			<h2 className='heading--big'>{errorResponse.statusText}</h2>
			<button onClick={handleNavigate} className='btn' style={{ marginTop: '1rem' }}>
				Home
			</button>
		</div>
	);
};

export default ErrorElement;

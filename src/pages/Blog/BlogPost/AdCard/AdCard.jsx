import BlogAdSense from '../BlogAdSense';
import './AdCard.css';

const AdCard = () => {
	return (
		<div className='ad-card'>
			<div className='ad-card-container'>
				<BlogAdSense
					className='blog-ad'
					style={{
						display: 'block',
						width: '100%',
						height: '100%',
						minHeight: '250px',
					}}
				/>
			</div>
		</div>
	);
};

export default AdCard;

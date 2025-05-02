import { GoogleAd } from '../../../../components';
import './AdCard.css';

const AdCard = () => {
	return (
		<div className='ad-card'>
			<div className='ad-card-container'>
				<p className='ad-card-label'>Sponsored</p>
				<GoogleAd
					className='blog-ad'
					style={{
						display: 'block',
						width: '100%',
						height: '100%',
						minHeight: '250px',
					}}
                    format="fluid"
                    layout="-6t+ed+2i-1n-4w"
                    slot="8896538111"
				/>
			</div>
		</div>
	);
};

export default AdCard;

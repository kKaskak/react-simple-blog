import { GoogleAd } from '../../../components';
import './FeaturedBlogAd.css';

const FeaturedBlogAd = () => {
	return (
		<div className='featured-blog-ad'>
			<div className='featured-ad-container'>
				<p className='featured-ad-label'>Sponsored</p>
				<GoogleAd slot='2219449124' format='auto' style={{ display: 'block' }} className='featured-ad' data-full-width-responsive='true' />
			</div>
		</div>
	);
};

export default FeaturedBlogAd;

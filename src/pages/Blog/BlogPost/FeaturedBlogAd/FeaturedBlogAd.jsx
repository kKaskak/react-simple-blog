import { useEffect } from 'react';
import './FeaturedBlogAd.css';

const FeaturedBlogAd = () => {
	useEffect(() => {
		// Initialize the ad once the component mounts
		if (window.adsbygoogle) {
			try {
				(window.adsbygoogle = window.adsbygoogle || []).push({});
			} catch (error) {
				console.error('AdSense error:', error);
			}
		}
	}, []);

	return (
		<div className='featured-blog-ad'>
			<div className='featured-ad-container'>
				<p className='featured-ad-label'>Sponsored</p>
				<ins
					className='adsbygoogle featured-ad'
					style={{ display: 'block' }}
					data-ad-client='ca-pub-9291762497944939'
					data-ad-slot='2219449124'
					data-ad-format='auto'
					data-full-width-responsive='true'
				/>
			</div>
		</div>
	);
};

export default FeaturedBlogAd;

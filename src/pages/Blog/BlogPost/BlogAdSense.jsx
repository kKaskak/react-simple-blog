import { useEffect } from 'react';
import PropTypes from 'prop-types';

const BlogAdSense = ({ slot = '8896538111', format = 'fluid', layoutKey = '-6t+ed+2i-1n-4w', style = { display: 'block' }, className = '' }) => {
	useEffect(() => {
		// Only perform this if window.adsbygoogle exists
		if (window.adsbygoogle) {
			try {
				(window.adsbygoogle = window.adsbygoogle || []).push({});
			} catch (error) {
				console.error('AdSense error:', error);
			}
		}
	}, []);

	const adProps = {
		className: `adsbygoogle ${className}`,
		style,
		'data-ad-client': 'ca-pub-9291762497944939',
		'data-ad-slot': slot,
		'data-ad-format': format,
	};

	// Add layout key for native ads
	if (layoutKey) {
		adProps['data-ad-layout-key'] = layoutKey;
	}

	return <ins {...adProps} />;
};

BlogAdSense.propTypes = {
	slot: PropTypes.string,
	format: PropTypes.string,
	layoutKey: PropTypes.string,
	style: PropTypes.object,
	className: PropTypes.string,
};

export default BlogAdSense;

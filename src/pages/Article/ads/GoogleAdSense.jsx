import { useEffect } from 'react';
import PropTypes from 'prop-types';

const GoogleAdSense = ({ slot, format = 'auto', layout = null, style = { display: 'block' }, className = '' }) => {
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

	// Add optional layout attribute for in-article ads
	if (layout) {
		adProps['data-ad-layout'] = layout;
	}

	return <ins {...adProps} />;
};

GoogleAdSense.propTypes = {
	slot: PropTypes.string.isRequired,
	format: PropTypes.string,
	layout: PropTypes.string,
	style: PropTypes.object,
	className: PropTypes.string,
};

export default GoogleAdSense;

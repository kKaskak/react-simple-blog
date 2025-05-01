import { useEffect } from 'react';
import PropTypes from 'prop-types';

function GoogleAd({ slot, format = 'auto', responsive = true, layout = '-6t+ed+2i-1n-4w', style = { display: 'block' }, className = '' }) {
	useEffect(() => {
		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch (err) {
			console.error('AdSense error:', err);
		}
	}, []);

	return (
		<>
			<ins
				className={`adsbygoogle ${className}`}
				style={style}
				data-ad-client='ca-pub-9338161783698268'
				data-ad-slot={slot}
				data-ad-format={format}
				data-ad-layout={responsive ? layout : undefined}
				data-full-width-responsive={responsive ? 'true' : 'false'}
			/>
		</>
	);
}

export default GoogleAd;

GoogleAd.propTypes = {
	slot: PropTypes.string.isRequired,
	format: PropTypes.string,
	responsive: PropTypes.bool,
	layout: PropTypes.string,
	style: PropTypes.object,
	className: PropTypes.string,
};

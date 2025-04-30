/* eslint-disable react/prop-types */
import { Adsense } from '@ctrl/react-adsense';

// Simple wrapper component for AdSense
const GoogleAd = ({ slot, format, layout, style = {} }) => {
	const defaultStyle = {
		display: 'block',
		textAlign: 'center',
		margin: '10px 0',
		...style,
	};
	return (
		<Adsense
			client='ca-pub-9291762497944939'
			slot={slot}
			style={defaultStyle}
			format={format}
			layout={layout}
			responsive={format === 'auto' ? true : undefined}
		/>
	);
};

export default GoogleAd;

/* eslint-disable react/prop-types */
import { Adsense } from '@ctrl/react-adsense';
import { useState, useEffect } from 'react';

// Simple wrapper component for AdSense
const GoogleAd = ({ slot, format, layout, style = {} }) => {
	const [isReactSnap, setIsReactSnap] = useState(true);

	useEffect(() => {
		// Check if we're in react-snap pre-rendering phase
		const isBot = window.navigator.userAgent === 'ReactSnapBot';
		setIsReactSnap(isBot);
	}, []);

	// Don't render ads during pre-rendering
	if (isReactSnap) {
		return <div style={{ ...style, minHeight: '100px' }}></div>;
	}

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

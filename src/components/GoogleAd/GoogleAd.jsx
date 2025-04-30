/* eslint-disable react/prop-types */
import { Adsense } from '@ctrl/react-adsense';
import { useEffect, useState } from 'react';

const GoogleAd = ({ slot, format, layout, style = {} }) => {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		// Only render ads in the browser, not during static rendering
		setIsBrowser(typeof window !== 'undefined');
	}, []);

	const defaultStyle = {
		display: 'block',
		textAlign: 'center',
		margin: '10px 0',
		...style,
	};

	// Don't render during static site generation or when detected as a prerender
	if (
		!isBrowser ||
		(typeof navigator !== 'undefined' &&
			(navigator.userAgent.includes('StaticRenderer') ||
				navigator.userAgent.includes('prerender') ||
				navigator.userAgent.includes('Headless') ||
				navigator.userAgent.includes('puppeteer')))
	) {
		return <div style={{ ...defaultStyle, minHeight: '100px' }}></div>;
	}

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

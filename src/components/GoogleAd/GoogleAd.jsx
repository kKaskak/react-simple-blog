import { useEffect, useState } from 'react';

// Helper to detect if we're in a pre-rendering environment
const isPrerendering = () => {
	return (
		typeof navigator !== 'undefined' &&
		navigator.userAgent &&
		(navigator.userAgent.includes('ReactSnap') || navigator.userAgent.includes('Headless') || navigator.userAgent.includes('puppeteer'))
	);
};

// Helper to detect if we're on the client
const isClient = () => {
	return typeof window !== 'undefined';
};

// eslint-disable-next-line react/prop-types
const GoogleAd = ({ slot, format, layout, style }) => {
	const [adLoaded, setAdLoaded] = useState(false);

	useEffect(() => {
		// Only try to load ads on the client side and not during pre-rendering
		if (isClient() && !isPrerendering()) {
			// Initialize ads when the component mounts
			try {
				if (window.adsbygoogle) {
					const adElement = document.querySelector(`ins[data-ad-slot="${slot}"]`);
					if (adElement && !adLoaded) {
						(window.adsbygoogle = window.adsbygoogle || []).push({});
						setAdLoaded(true);
					}
				}
			} catch (e) {
				console.error('AdSense error:', e);
			}
		}
	}, [slot, adLoaded]);

	// During pre-rendering, render a placeholder instead of the actual ad
	if (isPrerendering()) {
		return (
			<div
				className='ad-placeholder'
				style={{
					...style,
					background: '#f0f0f0',
					height: '100px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<span>Advertisement</span>
			</div>
		);
	}

	// Regular ad rendering for the browser
	return (
		<ins
			className='adsbygoogle'
			style={style}
			data-ad-client='ca-pub-9291762497944939'
			data-ad-slot={slot}
			data-ad-format={format}
			data-ad-layout={layout}
		/>
	);
};

export default GoogleAd;

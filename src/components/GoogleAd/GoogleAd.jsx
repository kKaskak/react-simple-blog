import { useEffect, useState } from 'react';

// More comprehensive detection of pre-rendering/build environments
const isPrerendering = () => {
	// Check for ReactSnap, Puppeteer, or other headless browsers
	if (typeof navigator !== 'undefined' && navigator.userAgent) {
		return navigator.userAgent.includes('ReactSnap') || navigator.userAgent.includes('Headless') || navigator.userAgent.includes('puppeteer');
	}

	// Check for common SSR/build environment variables
	if (typeof process !== 'undefined' && process.env) {
		return process.env.NODE_ENV === 'test' || process.env.IS_BUILDING === 'true' || !!process.env.REACT_SNAP;
	}

	return false;
};

// Helper to detect if we're on the client and not in a build process
const isBrowser = () => {
	return typeof window !== 'undefined' && typeof document !== 'undefined' && document.querySelector !== undefined && !isPrerendering();
};

// eslint-disable-next-line react/prop-types
const GoogleAd = ({ slot, format, layout, style = {} }) => {
	const [adLoaded, setAdLoaded] = useState(false);

	useEffect(() => {
		// Only run in actual browser environments, not during build
		if (!isBrowser()) return;

		// Ensure Google AdSense script is loaded
		const loadAdSense = () => {
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
		};

		// Short delay to ensure DOM is ready
		const timer = setTimeout(loadAdSense, 100);
		return () => clearTimeout(timer);
	}, [slot, adLoaded]);

	// During prerendering or build, return an empty div to prevent any external requests
	if (!isBrowser()) {
		return (
			<div
				className='ad-placeholder'
				style={{
					...style,
					background: '#f0f0f0',
					minHeight: '100px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<span>Advertisement</span>
			</div>
		);
	}

	// Only render the actual ad component in browser environments
	return (
		<ins
			className='adsbygoogle'
			style={style}
			data-ad-client='ca-pub-9291762497944939'
			data-ad-slot={slot}
			data-ad-format={format || ''}
			data-ad-layout={layout || ''}
		/>
	);
};

export default GoogleAd;

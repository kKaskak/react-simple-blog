/**
 * Loads the Google AdSense script only in real browser environments,
 * not during React Snap pre-rendering
 */
export const loadGoogleAdsScript = () => {
	// Check if we're running in a browser (window exists) and not in React Snap
	// React Snap sets window.navigator.userAgent with ReactSnap info
	if (typeof window !== 'undefined' && !(window.navigator.userAgent && window.navigator.userAgent.includes('ReactSnap'))) {
		const script = document.createElement('script');
		script.async = true;
		script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9291762497944939';
		script.crossOrigin = 'anonymous';
		document.head.appendChild(script);
	}
};

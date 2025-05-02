/**
 * Loads the scripts only in real browser environments,
 * not during React Snap pre-rendering
 */
export const loadScripts = () => {
	// Check if we're running in a browser (window exists) and not in React Snap
	// React Snap sets window.navigator.userAgent with ReactSnap info
	if (typeof window !== 'undefined' && !(window.navigator.userAgent && window.navigator.userAgent.includes('ReactSnap'))) {

		// Load Google Ads script

		const script = document.createElement('script');
		script.async = true;
		script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9291762497944939';
		script.crossOrigin = 'anonymous';
		document.head.appendChild(script);

		// Load analytics script

		const analyticsScript = document.createElement('script');
		analyticsScript.defer = true;
		analyticsScript.src = 'https://analytics.codechameleon.com/script.js';
		analyticsScript.setAttribute('data-website-id', '53fb81e7-d2b3-42be-ab56-85824955adec');
		document.head.appendChild(analyticsScript);

	}
};

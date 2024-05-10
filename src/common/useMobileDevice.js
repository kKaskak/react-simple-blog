import { useState, useEffect } from 'react';

const useMobileDevice = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 800);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [window.innerWidth, window.outerWidth]);

	return isMobile;
};

export default useMobileDevice;

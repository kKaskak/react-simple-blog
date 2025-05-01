'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect if device is mobile based on screen width
 */
export function useMobileDevice(breakpoint = 768) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Check on initial render
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth < breakpoint);
		};

		// Set initial value
		checkIsMobile();

		// Add event listener for window resize
		window.addEventListener('resize', checkIsMobile);

		// Cleanup event listener
		return () => {
			window.removeEventListener('resize', checkIsMobile);
		};
	}, [breakpoint]);

	return isMobile;
}

/**
 * Hook to manage a binary (true/false) state with helper functions
 * @returns [state, toggleState, closeState, openState]
 */
export function useBinaryState(): [boolean, () => void, () => void, () => void] {
	const [state, setState] = useState(false);

	const toggleState = () => {
		setState(!state);
	};

	const closeState = () => {
		setState(false);
	};

	const openState = () => {
		setState(true);
	};

	return [state, toggleState, closeState, openState];
}

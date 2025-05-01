import { useState } from 'react';

/**
 * Custom hook for managing binary states (true/false)
 * @param initialValue - Initial state value
 * @returns Array with [state, open, close, toggle] functions
 */
export function useBinaryState(initialValue = false): [boolean, () => void, () => void, () => void] {
	const [state, setState] = useState<boolean>(initialValue);

	const open = () => setState(true);
	const close = () => setState(false);
	const toggle = () => setState((prev) => !prev);

	return [state, open, close, toggle];
}

import { useState, useCallback } from 'react';

const useBinaryState = (initialValue) => {
    const [value, setValue] = useState(!!initialValue);
    const on = useCallback(() => {
        setValue(true);
    }, []);
    const off = useCallback(() => {
        setValue(false);
    }, []);
    const toggle = useCallback(() => {
        setValue(!value);
    }, [value]);
    return [value, on, off, toggle];
};

export default useBinaryState;

import { useState, useEffect } from 'react';

export default function usePersistedState(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    } catch (error) {
        console.error(error);
        return initialValue;
    }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if(item !== JSON.stringify(storedValue)){
                setStoredValue(item ? JSON.parse(item) : initialValue);
            }
        } catch (error) {
            console.error(error);
        }
    }, [key]);

    return [storedValue, setValue];
}
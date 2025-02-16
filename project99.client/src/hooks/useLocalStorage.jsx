import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage key:", key, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error("Error setting localStorage key:", key, error);
        }
    }, [key, storedValue]);

    // Function to remove item from localStorage
    const removeItem = () => {
        try {
            localStorage.removeItem(key);
            setStoredValue(initialValue); // Reset state to initial value
        } catch (error) {
            console.error("Error removing localStorage key:", key, error);
        }
    };

    return [storedValue, setStoredValue, removeItem];
};

export default useLocalStorage;

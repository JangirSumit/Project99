import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
    // Lazy initialization: Only set `initialValue` if key does not exist
    const getStoredValue = () => {
        try {
            const item = localStorage.getItem(key);
            return item !== null ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage key:", key, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState(getStoredValue);

    useEffect(() => {
        try {
            if (storedValue !== undefined) {
                localStorage.setItem(key, JSON.stringify(storedValue));
            }
        } catch (error) {
            console.error("Error setting localStorage key:", key, error);
        }
    }, [key, storedValue]);

    // Function to update localStorage manually
    const updateValue = (value) => {
        setStoredValue((prevValue) => {
            const newValue = typeof value === "function" ? value(prevValue) : value;
            localStorage.setItem(key, JSON.stringify(newValue));
            return newValue;
        });
    };

    // Function to remove the item from localStorage
    const removeItem = () => {
        try {
            localStorage.removeItem(key);
            setStoredValue(undefined); // Reset state
        } catch (error) {
            console.error("Error removing localStorage key:", key, error);
        }
    };

    return [storedValue, updateValue, removeItem];
};

export default useLocalStorage;

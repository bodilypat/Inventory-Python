/* ********************************** */
/* File: src/hooks/useLocalStorage.js */ 
/* ********************************** */

import { useCallback, useState } from "react";

const useLocalStorage = (key, initialValue) => {
    const getStoragedValue = () => { 
        try {
            const item = localStorage.getItem(key);

            if (item === null) {
                return typeof initialValue === "function"
                    ? initialValue()
                    : initialValue;
            }

            return JSON.parse(item);
        } catch {
            return typeof initialValue === "function"
                ? initialValue()
                : initialValue;
        }
    };

    const [value, setValue] = useState(getStoragedValue);

    const setStoragedValue = useCallback(
        (newValue) => {
            try {
                const valueToStore = newValue instanceof Function 
                    ? newValue(value)
                    : newValue; 
                
                setValue(valueToStore);
                localStorage.setItem(
                    key,
                    JSON.stringify(valueToStore)
                );
            } catch (error) {
                console.error("Failed to save localStorage vallue: ", error);
            }
        },
        [key, value]
    );

    const removeValue = useCallback(() => {
        localStorage.removeItem(key);

        setValue(
            typeof initialValue === "function"
                ? initialValue()
                : initialValue
        );
    }, [key, initialValue]);

    return [value, setStoragedValue, removeValue];
};
export default useLocalStorage;



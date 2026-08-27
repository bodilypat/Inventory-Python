/* *************************** */
/* File: src/hooks/useTheme.js */ 
/* *************************** */

import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

const getInitialTheme = () => {
    const storedTheme = localStorage.getItem(STORAGE_KEY);

    if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

const useTheme = () => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light");
    };

    return {
        theme,
        setTheme,
        toggleTheme,
        isDark: theme === "dark",
    };
};

export default useTheme;


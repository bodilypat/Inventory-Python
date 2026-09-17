/* ********************************************* */
/* File: src/features/auth/utils/tokenHelpers.js */
/* ********************************************* */
import {
    TOKEN_KEY,
    REFRESH_TOKEN_KEY,
} from '../constants/authConstants';

export const getAccessToken = () => 
    localStorage.getItem(TOKEN_KEY);

export const setAccessToken = (token) => {
    if (!token) {
        localStorage.removeItem(TOKEN_KEY);
        return;
    }

    localStorage.setItem(TOKEN_KEY, token);
};

export const getRefreshToken = () => 
    localStorage.getItem(REFRESH_TOKEN_KEY);

export const setRefreshToken = (token) => {
    if (!token) {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        return;
    }

    localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const clearTokens = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const decodeToken = (token) => {
    if (!token) return null;

    try {
        const payload = token.split('.')[1];

        if (!payload) return null;

        const normalized = payload
            .replace(/-/g, '+')
            .replace(/_/g,'/');

        const decoded = atob(normalized);

        return JSON.parse(decoded);
    } catch {
        return null;
    }
};

export const isTokenExpired = (token) => {
    const payload = decodeToken(token);

    if (!payload?.exp) {
        return false; 
    }

    return payload.exp * 1000 < Date.now(); 
};


/* ************************************************** */
/* File: src/features/auth/constants/authConstants.js */ 
/* ************************************************** */
export const AUTH_STORAGE_KEY = '';

export const TOKEN_KEY = 'accessToken';

export const REFRESH_TOKEN_KEY = 'refreshToken';

export const AUTH_EVENTS = Object.freeze({
    LOGIN: 'auth:login',
    LOGOUT: 'auth:logout',
    USER_UPDATED: 'auth:user-updated', 
});

export const AUTH_ROUTE = Object.freeze({
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    CHANGE_PASSWORD: '/change-password',
    VERIFY_EMAIL: '/verify-email',
    UNAUTHORIZED: '/unauthorized', 
});



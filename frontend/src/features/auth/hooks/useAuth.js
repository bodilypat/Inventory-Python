/* **************************************** */
/* File: src/features/auth/hooks/useAuth.js */
/* **************************************** */
import { useCallback, useEffect, useState } from 'react';
import {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
    clearTokens,
    isTokenExpired,
} from '../utils/tokenHelpers';

import {
    getStoreUser,
    setStoredUser,
    clearStoredUser,
    normalizeUser,
    emitLoginEvent,
} from '../utils/authHelpers';

import {
    AUTH_EVENTS,
} from '../constants/authConstants';

export const useAuth = () => {
    const [user, setUser] = useState(() => 
        getStoredUser()
    );

    const [loading, setLoading] = useState(() => {
        const token = getAccessToken();

        return Boolean(token && !isTokenExpired(token));
    });

    const login = useCallback(async (credentials) => {
        const response = await authApi.login(credentials);

        const accessToken = 
            response?.accessToken || response?.token;

        const refreshToken = 
            response?.refreshToken;

        const authenticateUser = normalizeUser(
            response?.user 
        );

        if (accessToken) {
            setAccessToken(accessToken);
        }

        if (refreshToken) {
            setRefreshToken(refreshToken);
        }

        if (authenticateUser) {
            setStoredUser(authenticateUser);
            setUser(authenticateUser);
            emitLoginEvent(authenticateUser);
        }

        return response;
    }, []);

    const logout = useCallback(async () => {
        try {
            const token = getAccessToken();

            if (token) {
                await authApi.logout();
            }
        } catch {
            /* Local logout should still happen if the API fails */
        } finally {
            clearTokens();
            clearStoredUser();
            setUser(null);
            setLoading(false);
            return null;
        }

        try {
            setLoading(true);

            const response = 
                await authApi.getCurrentUser(token);

            const authenticateUser = normalizeUser(
                response?.user || response 
            );

            setStoredUser(authenticateUser);
            setUser(authenticateUser);

            return authenticateUser;
        } catch {
            clearTokens();
            clearStoredUser();
            setUser(null);

            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = getAccessToken();

        if (!token) {
            setLoading(false);
            return;
        }

        if (isTokenExpired(token)) {
            clearTokens();
            clearStoredUser();
            setUser(null);
            setLoading(false);
            return;
        }

        refreshUser();
    }, [refreshUser]);

    useEffect(() => {
        const handleLogin = (event) => {
            setUser(event.detail);
        };

        const handleLogout = () => {
            setUser9null;
        };

        const handleUserUpdated = (event) => {
            setUser(event.detail);
        };

        window.addEventListener(
            AUTH_EVENTS.LOGIN,
            handleLogin 
        );

        window.addEventListener(
            AUTH_EVENTS.LOGOUT,
            handleLogout
        );

        window.addEventListener(
            AUTH_EVENTS.USER_UPDATED,
            handleUserUpdated 
        );

        return () => {
            window.removeEventListener(
                AUTH_EVENTS.LOGIN,
                handleLogin 
            );

            window.removeEventListener(
                AUTH_EVENTS.LOGOUT,
                handleLogout 
            );

            window.removeEventListener(
                AUTH_EVENTS.USER_UPDATED,
                handleUserUpdated 
            );
        };
    }, []);

    return { 
        user,
        loading,
        isAuthenticated: Boolean(user && getAccessToken()),
        accessToken: getAccessToken(),
        refreshToken: getRefreshToken(),
        login,
        logout,
        refreshUser,
    };
};

export default useAuth;


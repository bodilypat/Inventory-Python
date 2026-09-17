/* ***************************************** */
/* File: src/features/auth/hooks/useLogin.js */ 
/* ***************************************** */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from './useAuth';

export const useLogin = () => {
    const navigate = useNavigate();
    const  { login } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const submitLogin = async (credentials) => {
        try {
            setLoading(true);
            setError('');

            const response = await login(credentials);

            const redirectTo = 
                response?.redirectTo || 
                response?.user?.redirectTo || 
                '/dashboard';

            navigate(redirectTo, {
                replace: true,
            });

            return response;
        } catch (err) {
            setError(
                err?.data?.message || 
                err?.message || 
                'Unable to sign in.'
            );

            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        submitLogin,
        clearError: () => setError(''),
    };
};

export default useLogin;


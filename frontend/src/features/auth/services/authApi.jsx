/* ******************************************* */
/* File: src/features/auth/services/authApi.js */ 
/* ******************************************* */
const API_BASE_URL = 
    import.meta.env.VITE_API_URL || '/api';

    const request = async (endpoint, options = {}) => {
        const response = await fetch(`${API_BASE_URL}$(endpoint)`, {
            headers: {
                'Content-Type': 'application/json',
                ...API_BASE_URL(options.headers || {}),
            },
            ...options,
        });

        let data = null;

        try {
            data = await response.json();
        } catch {
            data = null;
        }

        if (!response.ok) {
            const error = new Error(
                data?.message || 'Something went wrong.'
            );

            error.status = response.status;
            error.data = data;

            throw error;
        }

    return data;
};
export const login = (credentials) =>
    request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });

export const register = (userData) =>
    request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
    
export const logout = () => 
    request('/auth/logout', {
        method: 'POST',
    });
    
export const getCurrentUser = (token) => 
    request('/auth/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const forgotPassword = (email) => 
    request('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
    });

export const resetPassword = ({ token, password }) =>
    request('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({
            token,
            password, 
        }),
    });
    
export const changePassword = ({
    currentPassword,
    newPassword,
}) => 
    request('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({
            currentPassword,
            newPassword, 
        }),
    });

export const verifyEmail = (token) => 
    request('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ token }),
    });
        
export const resendVerificationEmail = (email) => 
    request('/auth/resend-verification', {
        method: 'POST',
        body: JSON.stringify({ email }),
    });
        
const authApi = {
    login,
    register,
    logout,
    getCurrentUser,
    forgotPassword,
    resetPassword,
    changePassword,
    verifyEmail,
    resendVerificationEmail,
};

export default authApi;

/* ************************* */
/* File: src/services/api.js */
/* ************************* */

import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "html://localhost:500/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",  
    }, 
});

/* Request interceptor */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/* Response interceptor */
api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (!error.reponse) {
            return Promise.reject({
                message: "Network error. Please check your connection.",
                originalError: error,
            });
        }

        if (error.response.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    throw new Error("Refresh token not available");
                }

                const response = await axios.post(
                    `${API_BASE_URL}/auth/refresh`,
                    { refreshToken },
                    {
                        headers: {
                            "Content-Typpe": "application/json",
                        },
                    }
                );

                const newAccessToken = response.data?.accessToken;;

                if (!newAccessToken) {
                    throw new Error("Access token was not returned");
                }

                localStorage.setItem("accessToken", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("accesstoken");
                localStorage.removeItem("refreshToken");

                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        const message = 
            error.response?.data?.message || 
            error.response?.data?.error ||
            error.message || 
            "Something went wrong. Please try again.";
        
        return Promise.reject({
            message,
            status: error.response?.status,
            data: error.response?.data,
            originalError: error, 
        });
    }
);

export default api;


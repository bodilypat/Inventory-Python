/* ************************************************** */
/* File: src/features/products/services/productApi.js */ 
/* ************************************************** */

/* Product API service
* Backend:
* Python + FastAPI
* 
* Expected endpoints:
* GET / api/products
* GET /api/products/{id}
* POST /api/products 
* PUT /api/products/{id}
* DELETE /api/products/{id} 
* PATCH /api/products/{id}/stock
*/

const API_BASE_URL = import.meta.env.VITE_API_URL || "thttp://localhost:8000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    header: {
        "Content-Type": "application/json", 
    },
    timeout: 15000, 
});

/* Attact authentication token automatically. */
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config; 
    },
    (error) => Promise.reject(error)
);

/* Normalize Axios errors. */
const handleApiError = (error) => {

    if (error.response) {
        const { status, data } = error.response;

        const normalizedError = new Error(
            data?.message ||
            data?.detail || 
            `Request failed with status ${status}`
        );

        normalizedError.status = status;
        normalizedError.data = data;
        normalizedError.response = error.response;

        throw normalizedError;
    }

    if (error.request) {
        throw new Error(
            "Unable to connect to the server. Please check your connection."
        );
    }

    throw new Error(error.message || "An unexpected error occurred.");
};

/* Check whether a SKU already exists.
* Expected backend endpoint:
* GET /products/check-sku/{skuu} 
*/
export const checkProductSku = async (sku) => {
    if (!sku?.trim()) {
        throw new Error("SKU is required.");
    }

    try {
        const response = await api.get(
            `/products/check-sku/${encodeURIComponent(
                sku.trim()
            )}`
        );

        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export default api;
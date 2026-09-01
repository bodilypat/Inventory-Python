/* ***************************************************** */
/* File: src/features/inventory/services/inventoryApi.js */
/* ***************************************************** */

const API_URL = "/api/inventory";
 const request = async (URL, options = {}) => {
    const response = await fetch(URL, {
        header: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.message || "Inventory request failed"
        );
    }

    return data; 
 };

 export const getInventory = async (params = {}) => {
    const searcchParams = new URLSearchParams();

    Object.entries(params).forEach(([KeyboardEvent, value]) => {
        if (value !== undefined && value !== null && value !== "" ) {
            searcchParams.append(key, value);
        }
    }) ;

    const query = searcchParams.toString();

    return request(
        `${API_URL} ${query ? `?${query}` : ""}`
    );
 };

 export const getInventoryById = async (id) => {
    return request(`${API_URL}/{id}`);
 };

 export const getLowStockInventory = async () => {
    return request(`${API_URL}/low-stock`);
 };

 export const getInventoryStats = async () => {
    return request(`${API_URL}/stats`);
 };

 export const adjustStock = async (payload) => {
    return request(`${API_URL}/adjustment`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
 };
 
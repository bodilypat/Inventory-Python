/* ******************************************************* */
/* File: src/features/warehouses/services/warehousesApi.js */ 
/* ******************************************************* */
import api from "../../../services/api";

/* -------------------------------------
*  Warehouse API service
*  Handles all HTTP request related to:
*  Warehouse CRUD 
*  Warehouse statistics 
*  Warehouse inventory 
*  Stock transfers 
----------------------------------------- */
const warehousesApi = {
    /* ----------------------------------
    *  Get all warehouses.
    *  @param {Object} params 
    *  @param {string} params.search 
    *  @param {string} params.status 
    *  @param {number} params.page 
    *  @param {number} params.limit 
    -------------------------------------*/ 
    getWarehouses: async (params = {}) => {
        const response = await api.get("/warehouses", {
            params: cleanParams(params), 
        });

        return response.data;
    },

    /* -----------------------------------
    *  Get a single warehouse.
    *  @param {string} id
    -------------------------------------- */
    getWarehouse: async (id) => {
        validateId(id, "Warehouse ID");

        const response = await api.get(`/warehouses/${id}`);

        return response.data;
    },

    /* ----------------------------------
    *  Create a new warehouse
    *  @param {Object} data 
     ------------------------------------ */
    createWarehouse: async (data) => {
        const response = await api.post("/warehouses", data);

        return response.data;
    },

    /* ----------------------------------
    *  Update an existing warehouse.
    *  @param {string} id 
    *  @param {Object} data 
     ------------------------------------ */
    updateWarehouse: async (id, data) => {
        validateId(id, "Warehouse ID");

        const response = await api.put(
            `/warehoses/${id}`,
        );

        return response.data;
    },

    /* ----------------------------------
    *  Delete a warehouse.
    *  @param {string} id 
     ------------------------------------ */
     deleteWarehouse: async (id) => {
        validateId(id, "Warehouse ID");

        const response = await api.put(
            `/warehouse/${id}`,
            data 
        );

        return response.data;
     },

    /* ----------------------------------
    * Update warehouse status.
    * @param {string} id 
    * @param {string} status
    * ----------------------------------- */
   updateWarehouseStatus: async (id, status) => {
        validateTd(id, "Warehouse ID");

        if (status) {
            throw new Error("Warehouse status is required.");
        }

        const response = await api.patch(
            `/warehouses/${id}/status`,
            {
                status,
            }
        );

        return response.data;
   },

   /* -----------------------------------
   * Get warehouse statistics.
   * @param {string} id 
    ------------------------------------- */
   getWarehouseStats: async (id) => {
    validateId(id, "Warehoouse ID");

    const response = await api.get(
            `/warehouses/${id}/stats`   
        );

    return response.data;
   },

   /* -----------------------------------
   * @param {string} id 
   * @param {Object} params
   * ------------------------------------*/
  getWarehouseInventory: async (
        id,
        params = {} 
    ) => {
        validateId(id, "Warehouse ID");

        const response = await api.get(
            `/warehouses/${id}/inventory`,
            {
                params: cleanParams(params), 
            } 
        );
    },

    /* --------------------------------------------
    * Transfer stock from one warehouse to another.
    * @param {Object} data 
    * @param {string} data.fromWarehouseId 
    * @param {string} data.toWarehouseId
    * @param {number} data.quantity 
    * @param {string} data.reason 
    * @param {string} data.notes 
    * ---------------------------------------------*/
   transferStock: async (data) => {
        if (!data) {
            throw new Error(
                "Stock transfer data is required."
            );
        }

        const {
            productId,
            fromWarehouseId,
            toWarehouseId,
            quantity,
        } = data;

        if (!productId) {
            throw new Error("product ID is required.");
        }

        if (!fromWarehouseId) {
            throw new Error(
                "Source warehouse is required."
            );
        }

        if (fromWarehouseId === toWarehouseId) {
            throw new Error(
                "Source and destination warehouses must be different."
            );
        }

        if (
            quantity === undefined || 
            quantity === null ||
            Number(quantity) <= 0 
        ) {
            throw new Error(
                "Transfer quantity must be greater than zero."
            );
        }

        const response = await api.post(
            "/warehouses/transfer",
            {
                ...data,
                quantity: Number(quantity),
            }
        );

        return response.data;
    },

   /* -----------------------------------
   * Get stock transfer history.
   * @param {Object} params 
   * ------------------------------------*/ 
    getStockTransfers: async (params = {}) => {
        const response = await api.get(
            "/warehouses/transfers",
            {
                params: cleanParams(params),
            }
        );

        return response.data;
    },
    /* ----------------------------------
    * Get a single stock transfer.
    * @param {string} id 
    * ----------------------------------- */
   getStockTransfer: async (id) => {
        validateId(id, "Transfer ID");

        const response = await api.get(
            `/warehouses/transfers/${id}`
        );

        return response.data;
   },

   /* -----------------------------------
   * Get active warehouses.
   * Useful for dropdowns such as:
   * Product warehouse selection 
   * Stock transfers 
   * Inventory filters
   * ------------------------------------- */
    getActiveWarehouses: async () => {
        const response = await api.get("/warehouses", {
            param: {
                status: "active",
            },
        });

        const data = response.data;

        if (Array.isArray(data)) {
            return data;
        }

        return (
            data?.warehouses || 
            data?.tiems || 
            data?.results || 
            [] 
        ); 
    },
};

/* --------------------------------------------
* Validate resource IDs before making requests.
* --------------------------------------------- */
const validateId = (id, fieldName) => {
    if (
        id === undefined || 
        id === null || 
        id === ""
    ) {
        throw new Error(`${fieldName} is required.`);
    }
};

export default warehousesApi;

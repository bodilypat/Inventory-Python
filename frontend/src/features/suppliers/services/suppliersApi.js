/* ***************************************************** */
/* File: src/features/suppliers/services/suppliersApi.js */
/* ***************************************************** */

import api from "../../../services/api";

/**
 * Suppliers API Service
 *
 * Handles:
 * - Supplier CRUD
 * - Supplier status
 * - Supplier statistics
 * - Supplier purchase history
 */

const suppliersApi = {
  /*
   * Get suppliers with optional filtering and pagination.
   *
   * @param {Object} params
   * @param {string} params.search
   * @param {string} params.status
   * @param {number} params.page
   * @param {number} params.limit
   */
  getSuppliers: async (params = {}) => {
    const response = await api.get("/suppliers", {
      params: cleanParams(params),
    });

    return response.data;
  },

  /*
   * Get a single supplier.
   *
   * @param {string} id
   */
  getSupplier: async (id) => {
    const normalizedId = validateId(id, "Supplier ID");

    const response = await api.get(
      `/suppliers/${normalizedId}`
    );

    return response.data;
  },

  /*
   * Create a supplier.
   *
   * @param {Object} data
   */
  createSupplier: async (data) => {
    if (!isPlainObject(data)) {
      throw new Error("Supplier data is required.");
    }

    const response = await api.post(
      "/suppliers",
      sanitizeSupplierPayload(data)
    );

    return response.data;
  },

  /*
   * Update a supplier.
   *
   * @param {string} id
   * @param {Object} data
   */
  updateSupplier: async (id, data) => {
    const normalizedId = validateId(id, "Supplier ID");

    if (!isPlainObject(data)) {
      throw new Error("Supplier data is required.");
    }

    const response = await api.put(
      `/suppliers/${normalizedId}`,
      sanitizeSupplierPayload(data)
    );

    return response.data;
  },

  /*
   * Delete a supplier.
   *
   * @param {string} id
   */
  deleteSupplier: async (id) => {
    const normalizedId = validateId(id, "Supplier ID");

    const response = await api.delete(
      `/suppliers/${normalizedId}`
    );

    return response.data;
  },

  /*
   * Update supplier status.
   *
   * @param {string} id
   * @param {string} status
   */
  updateSupplierStatus: async (id, status) => {
    const normalizedId = validateId(id, "Supplier ID");

    const normalizedStatus = validateStatus(status, "Supplier status");

    const response = await api.patch(
      `/suppliers/${normalizedId}/status`,
      {
        status: normalizedStatus,
      }
    );

    return response.data;
  },

  /*
   * Get supplier statistics.
   *
   * @param {string} id
   */
  getSupplierStats: async (id) => {
    const normalizedId = validateId(id, "Supplier ID");

    const response = await api.get(
      `/suppliers/${normalizedId}/stats`
    );

    return response.data;
  },

  /*
   * Get supplier purchase history.
   *
   * @param {string} id
   * @param {Object} params
   */
  getSupplierPurchases: async (
    id,
    params = {}
  ) => {
    const normalizedId = validateId(id, "Supplier ID");

    const response = await api.get(
      `/suppliers/${normalizedId}/purchases`,
      {
        params: cleanParams(params),
      }
    );

    return response.data;
  },

  /*
   * Get only active suppliers.
   *
   * Useful for purchase forms and supplier
   * dropdowns.
   *
   * @param {Object} params
   */
  getActiveSuppliers: async (params = {}) => {
    const response = await api.get("/suppliers", {
      params: cleanParams({
        ...params,
        status: "active",
      }),
    });

    return normalizeListResponse(response.data);
  },

  /*
   * Search suppliers.
   *
   * Convenience method for autocomplete/dropdowns.
   *
   * @param {string} search
   * @param {number} limit
   */
  searchSuppliers: async (
    search = "",
    limit = 10
  ) => {
    const response = await api.get("/suppliers", {
      params: cleanParams({
        search,
        status: "active",
        limit,
      }),
    });

    return normalizeListResponse(response.data);
  },
};

/*
 * Remove empty query parameters.
 *
 * Prevents requests such as:
 *
 * ?search=&status=all&page=undefined
 */
const cleanParams = (params = {}) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        value !== ""
    )
  );
};

/*
 * Normalize list responses from different API shapes.
 */
const normalizeListResponse = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (!data || typeof data !== "object") {
    return [];
  }

  return data.suppliers || data.items || data.results || [];
};

/*
 * Remove blank values from supplier payloads.
 */
const sanitizeSupplierPayload = (data) => {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        value !== ""
    )
  );
};

/*
 * Validate resource IDs before making requests.
 */
const validateId = (id, fieldName) => {
  const normalizedId = typeof id === "string" ? id.trim() : id;

  if (
    normalizedId === undefined ||
    normalizedId === null ||
    normalizedId === ""
  ) {
    throw new Error(`${fieldName} is required.`);
  }

  return normalizedId;
};

/*
 * Validate supported supplier status values.
 */
const validateStatus = (status, fieldName) => {
  const normalizedStatus = typeof status === "string" ? status.trim() : status;

  if (!normalizedStatus) {
    throw new Error(`${fieldName} is required.`);
  }

  return normalizedStatus;
};

/*
 * Check whether the input is a plain object.
 */
const isPlainObject = (value) => {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
};

export default suppliersApi;

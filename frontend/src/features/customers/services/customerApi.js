/* ******************************************************* */
/* File: src/features/customers/services/customersApi.js   */
/* ******************************************************* */

import api from "../../../services/api";

/**
 * Customers API Service
 *
 * Handles:
 * - Customer CRUD
 * - Customer status
 * - Customer statistics
 * - Customer sales history
 * - Active customer lookup
 * - Customer search
 */

const customersApi = {
  /*
   * Get customers with pagination and filters.
   *
   * @param {Object} params
   * @param {string} params.search
   * @param {string} params.status
   * @param {number} params.page
   * @param {number} params.limit
   */
  getCustomers: async (params = {}) => {
    const response = await api.get("/customers", {
      params: cleanParams(params),
    });

    return response.data;
  },

  /*
   * Get a single customer.
   *
   * @param {string|number} id
   */
  getCustomer: async (id) => {
    validateId(id, "Customer ID");

    const response = await api.get(
      `/customers/${id}`
    );

    return response.data;
  },

  /*
   * Create a customer.
   *
   * @param {Object} data
   */
  createCustomer: async (data) => {
    validateData(data, "Customer data");

    const response = await api.post(
      "/customers",
      data
    );

    return response.data;
  },

  /*
   * Update an existing customer.
   *
   * @param {string|number} id
   * @param {Object} data
   */
  updateCustomer: async (id, data) => {
    validateId(id, "Customer ID");
    validateData(data, "Customer data");

    const response = await api.put(
      `/customers/${id}`,
      data
    );

    return response.data;
  },

  /*
   * Delete a customer.
   *
   * @param {string|number} id
   */
  deleteCustomer: async (id) => {
    validateId(id, "Customer ID");

    const response = await api.delete(
      `/customers/${id}`
    );

    return response.data;
  },

  /*
   * Update customer status.
   *
   * @param {string|number} id
   * @param {string} status
   */
  updateCustomerStatus: async (id, status) => {
    validateId(id, "Customer ID");

    if (!status) {
      throw new Error(
        "Customer status is required."
      );
    }

    const response = await api.patch(
      `/customers/${id}/status`,
      {
        status,
      }
    );

    return response.data;
  },

  /*
   * Get customer statistics.
   *
   * @param {string|number} id
   */
  getCustomerStats: async (id) => {
    validateId(id, "Customer ID");

    const response = await api.get(
      `/customers/${id}/stats`
    );

    return response.data;
  },

  /*
   * Get customer sales history.
   *
   * @param {string|number} id
   * @param {Object} params
   */
  getCustomerSales: async (
    id,
    params = {}
  ) => {
    validateId(id, "Customer ID");

    const response = await api.get(
      `/customers/${id}/sales`,
      {
        params: cleanParams(params),
      }
    );

    return response.data;
  },

  /*
   * Get active customers.
   *
   * Useful for:
   * - Sale forms
   * - Customer dropdowns
   * - Customer selection
   */
  getActiveCustomers: async (
    params = {}
  ) => {
    const response = await api.get(
      "/customers",
      {
        params: cleanParams({
          ...params,
          status: "active",
        }),
      }
    );

    return extractList(response.data);
  },

  /*
   * Search active customers.
   *
   * Useful for autocomplete fields in
   * the Sales feature.
   *
   * @param {string} search
   * @param {number} limit
   */
  searchCustomers: async (
    search = "",
    limit = 10
  ) => {
    const response = await api.get(
      "/customers",
      {
        params: cleanParams({
          search,
          status: "active",
          limit,
        }),
      }
    );

    return extractList(response.data);
  },

  /*
   * Get customers with outstanding balances.
   *
   * Useful for accounts/credit reports.
   *
   * @param {Object} params
   */
  getOutstandingCustomers: async (
    params = {}
  ) => {
    const response = await api.get(
      "/customers",
      {
        params: cleanParams({
          ...params,
          outstanding: true,
        }),
      }
    );

    return response.data;
  },
};

/**
 * Extract customer array from common API
 * response formats.
 */
const extractList = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  return (
    data?.customers ||
    data?.items ||
    data?.results ||
    []
  );
};

/**
 * Remove undefined, null and empty-string
 * query parameters.
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

/**
 * Validate resource ID.
 */
const validateId = (id, fieldName) => {
  if (
    id === undefined ||
    id === null ||
    id === ""
  ) {
    throw new Error(
      `${fieldName} is required.`
    );
  }
};

/**
 * Validate request body.
 */
const validateData = (data, fieldName) => {
  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    throw new Error(
      `${fieldName} is required.`
    );
  }
};

export default customersApi;

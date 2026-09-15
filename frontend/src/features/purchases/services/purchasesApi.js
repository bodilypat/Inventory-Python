/* ***************************************************** */
/* File: src/features/purchases/services/purchasesApi.js */
/* ***************************************************** */

import api from "../../../services/api";

/**
 * Purchases API service
 *
 * Handles:
 * - Purchase orders
 * - Purchase items
 * - Purchase status
 * - Purchase receiving
 * - Purchase receipts
 * - Search
 * - Statistics
 * - Summary
 */

/* Helpers */

/* ----------------------------------------------------------
* Helpers
* Remove undefined, null, and empty-string query parameters.
 ------------------------------------------------------------ */
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

/* ----------------------------------------------------------
 * Extract a readable API error message.
 ------------------------------------------------------------ */
const getApiError = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "An unexpected error occurred."
  );
};

/* --------------------------------------------
 * Execute an API request and normalize errors.
---------------------------------------------- */
const request = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

/* ---------------------------------
* Purchases API
* Get paginated purchase orders.
*
* @param {Object} params
------------------------------------ */
const getPurchases = async (params = {}) => {
  return request(() =>
    api.get("/purchases", {
      params: cleanParams(params),
    })
  );
};

/* ----------------------------------
* Get one purchase order.
*
* @param {string|number} purchaseId
 ------------------------------------ */
const getPurchase = async (purchaseId) => {
  return request(() =>
    api.get(`/purchases/${purchaseId}`)
  );
};

/* ---------------------------------
* Create a purchase order.
*
* @param {Object} purchaseData
 ----------------------------------- */
const createPurchase = async (
  purchaseData
) => {
  return request(() =>
    api.post(
      "/purchases",
      purchaseData
    )
  );
};

/* ---------------------------------
* Update a purchase order.
*
* @param {string|number} purchaseId
* @param {Object} purchaseData
------------------------------------- */
const updatePurchase = async (
  purchaseId,
  purchaseData
) => {
  return request(() =>
    api.put(
      `/purchases/${purchaseId}`,
      purchaseData
    )
  );
};

/* ---------------------------------
* Delete a purchase order.
*
* @param {string|number} purchaseId
----------------------------------- */
const deletePurchase = async (
  purchaseId
) => {
  return request(() =>
    api.delete(
      `/purchases/${purchaseId}`
    )
  );
};

/* ---------------------------------
* Purchase Status API
* Update purchase status.
*
* @param {string|number} purchaseId
* @param {string} status
 -----------------------------------*/

const updatePurchaseStatus = async (
  purchaseId,
  status
) => {
  return request(() =>
    api.patch(
      `/purchases/${purchaseId}/status`,
      {
        status,
      }
    )
  );
};

/* ---------------------------------
* Cancel a purchase order.
*
* @param {string|number} purchaseId
* @param {Object} data
 ----------------------------------- */
const cancelPurchase = async (
  purchaseId,
  data = {}
) => {
  return request(() =>
    api.patch(
      `/purchases/${purchaseId}/cancel`,
      data
    )
  );
};

/* ----------------------------------------- 
 * Purchase Items API
 * 
 * Get items belonging to a purchase order.
 *
 * @param {string|number} purchaseId
 ------------------------------------------ */

const getPurchaseItems = async (
  purchaseId
) => {
  return request(() =>
    api.get(
      `/purchases/${purchaseId}/items`
    )
  );
};

/* ------------------------------------
* Get one purchase item.
*
* @param {string|number} purchaseId
* @param {string|number} itemId
 -------------------------------------- */

const getPurchaseItem = async (
  purchaseId,
  itemId
) => {
  return request(() =>
    api.get(
      `/purchases/${purchaseId}/items/${itemId}`
    )
  );
};

/* ------------------------------------
 * Add an item to a purchase order.
 *
 * @param {string|number} purchaseId
 * @param {Object} itemData
 --------------------------------------*/

const addPurchaseItem = async (
  purchaseId,
  itemData
) => {
  return request(() =>
    api.post(
      `/purchases/${purchaseId}/items`,
      itemData
    )
  );
};

/* ------------------------------------
 * Update a purchase item.
 *
 * @param {string|number} purchaseId
 * @param {string|number} itemId
 * @param {Object} itemData
 ------------------------------------- */

const updatePurchaseItem = async (
  purchaseId,
  itemId,
  itemData
) => {
  return request(() =>
    api.put(
      `/purchases/${purchaseId}/items/${itemId}`,
      itemData
    )
  );
};

/* ------------------------------------
 * Delete a purchase item.
 *
 * @param {string|number} purchaseId
 * @param {string|number} itemId
 -------------------------------------- */
const deletePurchaseItem = async (
  purchaseId,
  itemId
) => {
  return request(() =>
    api.delete(
      `/purchases/${purchaseId}/items/${itemId}`
    )
  );
};

/* ---------------------------------------
 *  Purchase Receiving API
 * Receive products from a purchase order.
 *
 * This endpoint should normally:
 * 1. Validate received quantities.
 * 2. Update inventory.
 * 3. Create stock movements.
 * 4. Update purchase received quantities.
 * 5. Update purchase status.
 *
 * @param {string|number} purchaseId
 * @param {Object} receiveData
 --------------------------------------- */

const receivePurchase = async (
  purchaseId,
  receiveData
) => {
  return request(() =>
    api.post(
      `/purchases/${purchaseId}/receive`,
      receiveData
    )
  );
};

/* ---------------------------------------
 * Purchase Receipts API
 * Get receiving history for a purchase.
 *
 * @param {string|number} purchaseId
 ----------------------------------------- */

const getPurchaseReceipts = async (
  purchaseId
) => {
  return request(() =>
    api.get(
      `/purchases/${purchaseId}/receipts`
    )
  );
};

/* --------------------------------------
* Get one purchase receipt.
*
* @param {string|number} purchaseId
* @param {string|number} receiptId
---------------------------------------- */

const getPurchaseReceipt = async (
  purchaseId,
  receiptId
) => {
  return request(() =>
    api.get(
      `/purchases/${purchaseId}/receipts/${receiptId}`
    )
  );
};

/* --------------------------------------
*  Search API
* Search purchase orders.
*
* @param {Object} params
--------------------------------------- */

const searchPurchases = async (
  params = {}
) => {
  return request(() =>
    api.get("/purchases/search", {
      params: cleanParams(params),
    })
  );
};

/* --------------------------------------
* Statistics API
* Get purchase statistics.
*
* @param {Object} params
 ---------------------------------------- */

const getPurchaseStats = async (
  params = {}
) => {
  return request(() =>
    api.get("/purchases/stats", {
      params: cleanParams(params),
    })
  );
};

/* --------------------------------------
* Get purchase summary.
*
* @param {Object} params
 ----------------------------------------*/
const getPurchaseSummary = async (
  params = {}
) => {
  return request(() =>
    api.get("/purchases/summary", {
      params: cleanParams(params),
    })
  );
};

/* --------------------------------------
* Get purchases by date range.
*
* @param {string} dateFrom
* @param {string} dateTo
 ---------------------------------------- */
const getPurchasesByDateRange = async (
  dateFrom,
  dateTo
) => {
  return request(() =>
    api.get(
      "/purchases/date-range",
      {
        params: cleanParams({
          dateFrom,
          dateTo,
        }),
      }
    )
  );
};

/* ---- Export ----- */

const purchasesApi = {
  // Purchases
  getPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,

  // Status
  updatePurchaseStatus,
  cancelPurchase,

  // Items
  getPurchaseItems,
  getPurchaseItem,
  addPurchaseItem,
  updatePurchaseItem,
  deletePurchaseItem,

  // Receiving
  receivePurchase,
  getPurchaseReceipts,
  getPurchaseReceipt,

  // Search
  searchPurchases,

  // Statistics
  getPurchaseStats,
  getPurchaseSummary,
  getPurchasesByDateRange,
};

export default purchasesApi;

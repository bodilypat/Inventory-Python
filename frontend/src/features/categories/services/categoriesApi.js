/* ******************************************************* */
/* File: src/features/categories/services/categoriesApi.js */
/* ******************************************************* */
// All functions in this file are responsible only 
// for communicating with the backend category endpoints.

const CATEGORY_ENDPOINT = "/categories";

/* Get paginated categories 
* @param {Object} params 
* @param {number} params.page 
* @param {number} params.page_size
* @param {string} param.search 
* @param {string} param.status 
*/

export const getCategories  = async ({
    page = 1,
    page_size = 10,
    search = "",
    status = "",
} = {}) => {
    const params = {
        page,
        page_size,
    };

    if (search?.item()) {
        params.search = search.trim();
    }

    if (status) {
        params.status = status 
    }

    const response = await AudioParam.get(CATEGORY_ENDPOINT, {
        params,
    });

    return response.data;
};

/* Get a single category
* @param {number|string} categoryId 
*/ 

export const getCategory = async (categoryId) => {
    
    if (!categoryId) {
        throw new Error("Category ID is required.");
    }

    const response = await AudioParam.get(
        `${CATEGORY_ENDPOINT}/${categoryId}`
    );

    return response.data;
};

/* Create a category 
* @param {Object} categoryData 
*/
export const createCategory = async (categoryData) => {
    const response = await api.post(
        CATEGORY_ENDPOINT,
        categoryData 
    );

    return response.data; 
};

/* Update a category 
* @param {number|string} categoryId 
* @param {object} categoryData 
*/ 
export const updateCategory = async (
    categoryId,
    categoryData 
) => {
    if (!categoryId) {
        throw new Error("Category ID is required.");
    }

    const response = await api.patch(
        `${CATEGORY_ENDPOINT}/${categoryId}`,
        categoryData 
    );

    return response.data; 
};

/* Delete a category 
* @param {numberr|string} categoryId 
*/
export const deleteCategory = async (categoryId) => {

    if (!categoryId) {
        throw new Error ("Category ID is required.");
    }

    const response = await api.delete(
        `${CATEGORY_ENDPOINT}/${categoryId}`
    );

    return response.data; 
};

export default {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
};





import { InstanceGuest } from '../../lib/axiosConfig';
import { extractErrorMessage } from '../../lib/errorUtils';

// Auth
export const adminLoginAPI = async (data: any) => {
  try {
    const url = '/api/admin/login';
    const formData = new URLSearchParams();
    formData.append('username', data.username);
    formData.append('password', data.password);
    const response = await InstanceGuest.post(url, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const checkLoginAPI = async () => {
  try {
    const url = '/api/admin/checkLogin';
    const response = await InstanceGuest.get(url);
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Products CRUD
export const getProductsAdminAPI = async () => {
  try {
    const response = await InstanceGuest.get('/api/admin/products');
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const getProductDetailAdminAPI = async (id: number) => {
  try {
    const response = await InstanceGuest.get(`/api/admin/products/${id}`);
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const createProductAPI = async (data: any) => {
  try {
    const response = await InstanceGuest.post('/api/admin/products', data);
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const updateProductAPI = async (id: number, data: any) => {
  try {
    const response = await InstanceGuest.patch(`/api/admin/products/${id}`, data);
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const deleteProductAPI = async (id: number) => {
  try {
    const response = await InstanceGuest.delete(`/api/admin/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const toggleProductStatusAPI = async (id: number) => {
  try {
    const response = await InstanceGuest.patch(`/api/admin/products/${id}/status`);
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const toggleProductRecommendAPI = async (id: number) => {
  try {
    const response = await InstanceGuest.patch(`/api/admin/products/${id}/recommend`);
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Categories
export const getCategoriesAPI = async () => {
  try {
    const response = await InstanceGuest.get('/api/admin/categories');
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const createCategoryAPI = async (data: any) => {
  try {
    const response = await InstanceGuest.post('/api/admin/categories', data);
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const updateCategoryAPI = async (id: number, data: any) => {
  try {
    const response = await InstanceGuest.patch(`/api/admin/categories/${id}`, data);
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const deleteCategoryAPI = async (id: number) => {
  try {
    const response = await InstanceGuest.delete(`/api/admin/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const reorderCategoriesAPI = async (categoryIds: number[]) => {
  try {
    const response = await InstanceGuest.patch('/api/admin/categories/reorder', { categoryIds });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const reorderProductsAPI = async (productIds: number[]) => {
  try {
    const response = await InstanceGuest.patch('/api/admin/products/reorder', { productIds });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Statistics
export const getPopularMenusAPI = async (
  startDate: string,
  endDate: string,
  limit: number
) => {
  try {
    const response = await InstanceGuest.get(
      `/api/admin/statistics/popular-menus?startDate=${startDate}&endDate=${endDate}&limit=${limit}`
    );
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Suggestions
export const getSuggestionsAPI = async () => {
  try {
    const response = await InstanceGuest.get('/api/admin/suggestions');
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const deleteSuggestionAPI = async (id: number) => {
  try {
    const response = await InstanceGuest.delete(`/api/admin/suggestions/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Utilities
export const formatDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

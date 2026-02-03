import { InstanceGuest } from '../../lib/axiosConfig';
import { extractErrorMessage } from '../../lib/errorUtils';

export interface LibraryImage {
  id: number;
  url: string;
  originalFilename: string;
  imageType: 'HEADER' | 'PRODUCT';
  createdAt: string;
  headerDisplayOrder: number | null;
}

// Upload image to library
export const uploadLibraryImageAPI = async (
  file: File,
  type: 'HEADER' | 'PRODUCT'
): Promise<LibraryImage> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await InstanceGuest.post(
      `/api/admin/images/upload?type=${type}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// List images by type (newest first)
export const getLibraryImagesAPI = async (
  type: 'HEADER' | 'PRODUCT'
): Promise<LibraryImage[]> => {
  try {
    const response = await InstanceGuest.get(`/api/admin/images?type=${type}`);
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Delete image from library
export const deleteLibraryImageAPI = async (id: number): Promise<void> => {
  try {
    await InstanceGuest.delete(`/api/admin/images/${id}`);
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Get active header images (admin)
export const getActiveHeaderImagesAPI = async (): Promise<LibraryImage[]> => {
  try {
    const response = await InstanceGuest.get('/api/admin/header-images');
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Set active header images
export const updateHeaderImagesAPI = async (
  imageUrls: string[]
): Promise<LibraryImage[]> => {
  try {
    const response = await InstanceGuest.put('/api/admin/header-images', {
      imageUrls,
    });
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Public: get header images for main page carousel
export const getPublicHeaderImagesAPI = async (): Promise<LibraryImage[]> => {
  try {
    const response = await InstanceGuest.get('/api/images/header');
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

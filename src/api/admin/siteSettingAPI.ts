import { InstanceGuest } from '../../lib/axiosConfig';
import { extractErrorMessage } from '../../lib/errorUtils';

export interface SiteSetting {
  settingKey: string;
  settingValue: string;
}

// Public endpoint - no auth needed
export const getSiteSettingsAPI = async (): Promise<SiteSetting[]> => {
  try {
    const response = await InstanceGuest.get('/api/site-settings');
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Admin endpoint
export const updateSiteSettingsAPI = async (settings: Record<string, string>): Promise<void> => {
  try {
    await InstanceGuest.put('/api/admin/site-settings', { settings });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

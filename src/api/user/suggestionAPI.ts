import { InstanceGuest } from '../../lib/axiosConfig';
import { extractErrorMessage } from '../../lib/errorUtils';

export const createSuggestionAPI = async (content: string) => {
  try {
    const response = await InstanceGuest.post('/api/suggestions', { content });
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

/**
 * API Service for Frontend
 * Fetches plans data from the backend API
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

/**
 * Get all plans grouped by category
 * @returns {Promise<Array>} Array of plan categories with plans
 */
export const getPlans = async () => {
  try {
    const response = await fetch(`${API_URL}/api/public/plans`);
    if (!response.ok) {
      throw new Error('Failed to fetch plans');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

/**
 * Get site configuration
 * @returns {Promise<Object>} Site configuration object
 */
export const getConfig = async () => {
  try {
    const response = await fetch(`${API_URL}/api/public/config`);
    if (!response.ok) {
      throw new Error('Failed to fetch config');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching config:', error);
    throw error;
  }
};

export default { getPlans, getConfig };

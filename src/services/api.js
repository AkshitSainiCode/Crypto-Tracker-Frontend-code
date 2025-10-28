import axios from 'axios';

// Base URL for API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch crypto data - ALWAYS use database to avoid rate limits
export const fetchCoins = async () => {
  try {
    // Use database endpoint instead of live API to avoid rate limits
    const response = await api.get('/coins/current');
    return response.data;
  } catch (error) {
    console.error('Error fetching coins from database:', error);
    throw error;
  }
};

// Fetch live data from CoinGecko (use sparingly - only for manual refresh)
export const fetchLiveCoins = async () => {
  try {
    const response = await api.get('/coins');
    return response.data;
  } catch (error) {
    console.error('Error fetching live coins:', error);
    
    // Fallback to database if API fails
    try {
      const dbResponse = await api.get('/coins/current');
      return {
        ...dbResponse.data,
        fromFallback: true,
        message: 'Showing data from database (API temporarily unavailable)'
      };
    } catch (dbError) {
      throw error;
    }
  }
};

// Fetch current data from database (direct access)
export const fetchCurrentCoins = async () => {
  try {
    const response = await api.get('/coins/current');
    return response.data;
  } catch (error) {
    console.error('Error fetching current coins:', error);
    throw error;
  }
};

// Save price snapshot
export const saveHistory = async () => {
  try {
    const response = await api.post('/history');
    return response.data;
  } catch (error) {
    console.error('Error saving history:', error);
    throw error;
  }
};

// Fetch coin history
export const fetchCoinHistory = async (coinId, limit = 24) => {
  try {
    const response = await api.get(`/history/${coinId}?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coin history:', error);
    throw error;
  }
};

export default api;
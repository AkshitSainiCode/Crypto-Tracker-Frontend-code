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

// Fetch live crypto data
export const fetchCoins = async () => {
  try {
    const response = await api.get('/coins');
    return response.data;
  } catch (error) {
    console.error('Error fetching coins:', error);
    throw error;
  }
};

// Fetch current data from database
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
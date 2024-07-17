// src/services/api.js
import axios from 'axios';

const cors = require('cors');
const API_URL = 'http://localhost:8080/api';
App.use(cors());
export const getData = async () => {
  try {
    const response = await axios.get(`${API_URL}/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};

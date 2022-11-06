import axios from 'axios';
import { BASE_URL } from '@/env.js';

const weatherAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default weatherAxios;
import weatherAxios from '@/services/weather/api.js'
import { API_KEY } from '@/env.js';

const getCityWeather = (city) => weatherAxios.get(`weather?q=${city}&appid=${API_KEY}`);

export default getCityWeather;
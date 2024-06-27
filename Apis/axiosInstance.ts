import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.100.57:19322/api',
  timeout: 10000,
});

export default instance;

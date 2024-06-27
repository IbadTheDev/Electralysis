import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.0.2.2:19322/api',
  timeout: 10000,
});

export default instance;

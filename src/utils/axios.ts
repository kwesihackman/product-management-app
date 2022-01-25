import axios from 'axios';

const endPointInstance = axios.create({
  baseURL: 'http://www.mocky.io/v2',
});

export default endPointInstance;

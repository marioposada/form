import axios from 'axios';

export default axios.create({
  baseURL: 'https://apis-qa.getappa.com.ar',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer xxxx',
  },
});

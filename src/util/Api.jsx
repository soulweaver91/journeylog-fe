import axios from 'axios';

class Api {
  axiosInterface = null;

  constructor({ baseURL }) {

    this.axiosInterface = axios.create({
      baseURL
    });
  }

  request(url, params) {
    // params may be modified here later
    return this.axiosInterface.request(url, params).then((response) => Promise.resolve(response.data));
  }
}

const instance = new Api({
  baseURL: process.env.REACT_APP_API_URL
});

export default instance;

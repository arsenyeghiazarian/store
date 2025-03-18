import axios from "axios";

const get = (url: string) => {
  return axios({
    method: 'get',
    url: url + `?token=${import.meta.env.VITE_TOKEN}`,
    baseURL: import.meta.env.VITE_BASE_URL
  });
}

const AxiosService = {
  get
}

export default AxiosService;

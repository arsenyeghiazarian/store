import axiosInstance from '@/plugins/axios';

const get = (url: string) => {
  return axiosInstance({ method: 'get', url: url + `?token=${import.meta.env.VITE_TOKEN}` });
};

const AxiosService = { get };

export default AxiosService;

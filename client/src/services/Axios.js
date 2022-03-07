import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expected =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expected) toast.error("An unexpected error occurred ");

  return Promise.reject(error);
});

const Axios = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default Axios;

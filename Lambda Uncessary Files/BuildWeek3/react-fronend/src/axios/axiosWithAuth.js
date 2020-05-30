import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https://expat-journal-2-back-end.herokuapp.com",
    headers: {
      token: token
    }
  });
};

export default axiosWithAuth;
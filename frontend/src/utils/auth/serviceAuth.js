import axios from "axios";
import Cookies from "js-cookie";

//definindo endpoint
const API_URL = process.env.REACT_APP_API_URL + "/api/users/";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  const { token } = response.data;

  Cookies.set("accessToken", token, { expires: 7 });

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  const newAcessToken = response.data.token;
  Cookies.set("accessToken", newAcessToken, { expires: 7 });
  return response.data;
};

const getMe = async (accessToken) => {
  const response = await axios.get(API_URL + "me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

const logout = () => {
  Cookies.remove("accessToken");

  return null;
};

const authService = {
  register,
  login,
  getMe,
  logout,
};

export default authService;

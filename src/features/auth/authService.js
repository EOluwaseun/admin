import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

//login
const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  // console.log(response.data);
  //user data
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

//orders
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/get-allOrders`, config); // config means authorised user

  return response.data;
};

const authService = {
  login,
  getOrders,
};
export default authService;

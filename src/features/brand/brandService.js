import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/`);

  return response.data;
};

// it's d only post available in d route
const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}brand/`, brand, config);
  return response.data;
};

//get single brand by its id
const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );
  return response.data;
};

//get single brand by its id and update it
const getBrand = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`, config);
  return response.data;
};
//get single brand by its id and update it
const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url}brand/${id}`, config);
  return response.data;
};
const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};
export default brandService;

import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);

  return response.data;
};

//create category
const createCategories = async (productCatg) => {
  const response = await axios.post(
    `${base_url}category/`,
    productCatg,
    config
  );

  return response.data;
};
//get single brand by its id
const updateProductCategory = async (category) => {
  console.log(category);
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    { title: category.pCatData.title },
    config
  );
  return response.data;
};

//get single brand by its id and update it
const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);
  return response.data;
};
//get single brand by its id and update it
const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);
  return response.data;
};

const pCategoryService = {
  getProductCategories,
  createCategories,
  updateProductCategory,
  getProductCategory,
  deleteProductCategory,
};
export default pCategoryService;

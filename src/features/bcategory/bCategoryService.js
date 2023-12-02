import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getblogCats = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);

  return response.data;
};

// it's d only post available in d route
const createBlogcat = async (bcat) => {
  const response = await axios.post(`${base_url}blogcategory/`, bcat, config);
  return response.data;
};
//get single brand by its id
const updateBlogCat = async (blogCat) => {
  const response = await axios.put(
    `${base_url}blogcategory/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    config
  );
  return response.data;
};

//get single brand by its id and update it
const getBlogCat = async (id) => {
  const response = await axios.get(`${base_url}blogcategory/${id}`, config);
  return response.data;
};
//get single brand by its id and update it
const deleteBlogCat = async (id) => {
  const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
  return response.data;
};

const blogCat = {
  getblogCats,
  createBlogcat,
  updateBlogCat,
  getBlogCat,
  deleteBlogCat,
};
export default blogCat;

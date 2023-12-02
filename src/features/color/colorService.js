import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);

  return response.data;
};

const createColor = async (color) => {
  const response = await axios.post(`${base_url}color/`, color, config);

  return response.data;
};

//get single brand by its id
const updateColor = async (color) => {
  console.log(color);
  const response = await axios.put(
    //click d edit to navigate to -> localhost/color/colorId
    `${base_url}color/${color.id}`,
    //get d color title from color
    //colorData is the value from d addColor page, updating d title
    //first get d ID, and then get the Title
    { title: color.colorData.title },
    config
  );
  return response.data;
};

//get single brand by its id and update it
const getAColor = async (id) => {
  const response = await axios.get(`${base_url}color/${id}`, config);
  return response.data;
};
//get single brand by its id and update it
const deleteColor = async (id) => {
  const response = await axios.delete(`${base_url}color/${id}`, config);
  return response.data;
};

const color = {
  getColors,
  createColor,
  getAColor,
  deleteColor,
  updateColor,
};
export default color;

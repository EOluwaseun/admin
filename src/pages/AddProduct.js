import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; //validation
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { getProductCategories } from '../features/pcategory/pcategorySlice';
import { getColors } from '../features/color/colorSlice';
import { Select } from 'antd';
import Dropzone from 'react-dropzone';
import CustomInput from '../componets/CustomInput';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { createProducts, getAProduct, resetState } from '../features/product/productSlice';
import { toast } from 'react-toastify';

let schema = Yup.object().shape({
  title: Yup.string().required('Title is Required'),
  description: Yup.string().required('Description is Required'),
  price: Yup.number().required('Price is Required'),
  brand: Yup.string().required('Brand is Required'),
  category: Yup.string().required('Category is Required'),
  quantity: Yup.number().required('Quantity is Required'),
  color: Yup.array()
    .min(1, 'Pick at least one color')
    .required('Color is Required'),
  tags: Yup.string().required('Tags is Required'),
});
export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split('/')[3]
  const brandState = useSelector((state) => state.brand.brands);
  const pCatState = useSelector((state) => state.category.pCategories);
  const pColorState = useSelector((state) => state.color.pColors);
  const imgState = useSelector((state) => state.upload.images); //this piacking the payload
  const newProduct = useSelector((state) => state.product);

  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);

  

  
  const { isSuccess, 
    isLoading, 
    isError,
    prodName,
    prodDesc,
    prodCategory,
    prodImages,
    prodPrice,
    prodBrand,
    prodTags,
    prodColor,
    prodQuantity,
    updatedProduct, 
    createdProduct } = newProduct; // this is also picking from d store , so acces to all

    useEffect(() => {
      if (getProductId !== undefined) {
        dispatch(getAProduct(getProductId));
        img.push(prodImages);
      } else {
        dispatch(resetState());
      }
    }, [getAProduct]);
  
    useEffect(() => {
      dispatch(resetState())
      dispatch(getBrands());
      dispatch(getProductCategories());
      dispatch(getColors());
      //formik.values.color = color; // set d value of color to d color state
    }, [dispatch]);


  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success('Product Added Succesfully');
    }
    if (isSuccess && updatedProduct) {
      toast.success('Product Updated Succesfully');
      navigate('/admin/list-product'); //from admin go to list-product

    }
    if (isError) {
      toast.error('Something Wrong');
    }
  }, [createdProduct, isError, isSuccess]);

  // color
  const coloropt = []; // recheck this
  pColorState.forEach((i) => {
    coloropt.push({
      //push color states in the mpty array
      label: i.title,
      value: i._id,
    });
  });

  // images
  // imagestate is already an array, now map to single and then push is inside an array
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const img = [];
  imgState.forEach((i) => {
    img.push({
      //push color states in the mpty array
      public_id: i.public_id,
      url: i.url,
    });
  });
  // console.log(img);
  useEffect(() => {
    formik.values.images = img;
  }, [prodImages]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: prodName || '',
      description: prodDesc || '',
      price: prodPrice || '',
      brand: prodBrand || '',
      tags: prodTags || '',
      category: prodCategory || '',
      color: prodColor || '',
      quantity: prodQuantity || '',
      images: prodImages || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // dispatch(login(values)); //pass user into login
      // alert(JSON.stringify(values));
      dispatch(createProducts(values)); // create all values in the database
      // after dispatch reset form
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
        // navigate('/admin/list-product'); //from admin go to list-product
      }, 3000);
    },
  });

  // this is for images
  useEffect(() => {
    formik.values.color = color ? color : ''; // set d value of color to d color state
    formik.values.images = img; // set d value of color to d color state
  }, [color, formik.values, img]);

  const handleColors = (e) => {
    setColor(e); // set the target in the array
  };
  return (
    <div>
      <h3 className="text-4xl font-bold mb-2">Add Product</h3>
      <div>
        {/* <CustomInput type="text" label="Enter Product Title" /> */}
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Product title"
            name="title"
            val={formik.values.title}
            onCh={formik.handleChange('title')}
            onbl={formik.handleBlur('title')}
          />
          <div className="text-red-500 text-start text-[.8rem]">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <ReactQuill
            theme="snow"
            value={formik.values.description}
            name="description"
            onChange={formik.handleChange('description')}
            className="mb-3"
          />
          <div className="text-red-500 text-start text-[.8rem]">
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            label="Enter Product price"
            name="price"
            val={formik.values.price}
            onCh={formik.handleChange('price')}
            onbl={formik.handleBlur('price')}
          />
          <div className="text-red-500 text-start text-[.8rem]">
            {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null}
          </div>

          <select
            name="brand"
            id=""
            value={formik.values.brand}
            onChange={formik.handleChange('brand')}
            onBlur={formik.handleBlur('brand')}
            className="py-4 mb-4 w-full"
          >
            <option value="">Select Brand</option>
            {/* mapping brand in the option button */}
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="text-red-500 text-start text-[.8rem]">
            {formik.touched.brand && formik.errors.brand ? (
              <div>{formik.errors.brand}</div>
            ) : null}
          </div>

          <select
            name="tags"
            id=""
            value={formik.values.tags}
            onChange={formik.handleChange('tags')}
            onBlur={formik.handleBlur('tags')}
            className="py-4 mb-4 w-full"
          >
            <option value="">Select Tags</option>
            <option value="feature">Feature</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="text-red-500 text-start text-[.8rem]">
            {formik.touched.tags && formik.errors.tags ? (
              <div>{formik.errors.tags}</div>
            ) : null}
          </div>

          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
            id=""
            className="py-4 mb-4 w-full"
          >
            <option value="">Select Category</option>
            {pCatState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="text-red-500 text-start text-[.8rem]">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-[100%]"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="text-red-500 text-start text-[.8rem]">
            {formik.touched.color && formik.errors.color ? (
              <div>{formik.errors.color}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Qauntity"
            name="quantity"
            val={formik.values.quantity}
            onCh={formik.handleChange('quantity')}
            onbl={formik.handleBlur('quantity')}
          />
          <div className="text-red-500 text-start text-[.8rem]">
            {formik.touched.quantity && formik.errors.quantity ? (
              <div>{formik.errors.quantity}</div>
            ) : null}
          </div>
          <div className="bg-white border p-5 text-center cursor-pointer">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showImages flex flex-wrap gap-2">
            {imgState?.map((i, j) => {
              return (
                <div className="relative w-[200px] h-[200px]" key={j}>
                  <button
                    onClick={() => dispatch(delImg(i.public_id))}
                    type="button"
                    className="absolute"
                    style={{ top: '4px', right: '4px' }}
                  >
                    x
                  </button>
                  <img src={i.url} alt="" className="w-[100%] h-[100%]" />
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            className="btn bg-green-600 p-4 text-white  my-5 border-0 rounded-lg"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

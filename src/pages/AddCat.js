import React, { useEffect } from 'react';
import CustomInput from '../componets/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'; //validation
import { toast } from 'react-toastify';
import {
  createProductCategories,
  updateAProductCagory,
  getAProductCategory,
  // getProductCategories,
  resetState,
} from '../features/pcategory/pcategorySlice';

let schema = yup.object().shape({
  title: yup.string().required('Title is Required'),
});

function AddCat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //useLocation gives use object consisting of the page pathname, key and more
  // console.log(location);
  const getpCategoryId = location.pathname.split('/')[3];
  //split out the forwardSlash, and it returns an array, then we get last part of the array

  const newCategory = useSelector((state) => state.category);
  const {
    isSuccess,
    isLoading,
    isError,
    createCategory,
    pCategoryName,
    updatedCategory,
  } = newCategory; // this is also picking from d store , so acces to all

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: pCategoryName || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getpCategoryId !== undefined) {
        // pCatedata is going to d service provider
        const data = { id: getpCategoryId, pCatData: values };
        dispatch(updateAProductCagory(data));
      } else {
        dispatch(createProductCategories(values));
        formik.resetForm();
        dispatch(resetState());
        setTimeout(() => {
          dispatch(resetState());
          // navigate('/admin/list-category'); //from admin go to list-product
        }, 300);
      }
    },
  });

  // this get title back in the placeholder
  useEffect(() => {
    if (getpCategoryId !== undefined) {
      dispatch(getAProductCategory(getpCategoryId));
      //if id is present dispatch the getAbrand with the _ID
      // formik.values.title = brandName; this causes error
      //brandName is coiming from d slice and it holds the title
      // input value for title is called once again
    } else {
      dispatch(resetState());
    }
  }, [dispatch, formik.values, getpCategoryId]);

  useEffect(() => {
    if (createCategory && isSuccess) {
      toast.success('Category Added Successfully');
    }
    if (updatedCategory && isSuccess) {
      toast.success('Category updated successfully');
      navigate('/admin/list-category'); //from admin go to list-product
    }
    if (isError) {
      toast.error('Something Wrong');
    }
  }, [createCategory, isError, isSuccess, navigate, updatedCategory]);

  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">
          {' '}
          {getpCategoryId !== undefined ? 'Edit' : 'Add'} Category
        </h3>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Enter Category"
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
            <button className="btn bg-green-600 p-4 text-white  my-5 border-0 rounded-lg">
              {getpCategoryId !== undefined ? 'Edit' : 'Add'} Category
            </button>
          </form>
        </div>
        <div></div>
      </div>{' '}
    </div>
  );
}

export default AddCat;

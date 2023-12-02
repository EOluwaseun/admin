import React, { useEffect } from 'react';
import CustomInput from '../componets/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'; //validation
import { toast } from 'react-toastify';
import {
  createdBrand,
  getABrand,
  resetState,
  updateABrand,
} from '../features/brand/brandSlice';

let schema = yup.object().shape({
  title: yup.string().required('Title is Required'),
});

function AddBrand() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //useLocation gives use object consisting of the page pathname, key and more
  // console.log(location);
  const getBrandId = location.pathname.split('/')[3];
  //split out the forwardSlash, and it returns an array, then we get last part of the array
  // console.log(getBrandId);

  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isLoading,
    isError,
    createBrand,
    brandName,
    updatedBrand,
  } = newBrand; // this is also picking from d store , so acces to all

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || '', //if brandName is available use it as placeholder otherwise use nthin
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        dispatch(createdBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          // navigate('/admin/list-brand'); //from admin go to list-product
        }, 300);
      }
    },
  });

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
      //if id is present dispatch the getAbrand with the _ID
      // formik.values.title = brandName; this causes error
      //brandName is coiming from d slice and it holds the title
      // input value for title is called once again
    } else {
      dispatch(resetState());
    }
  }, [brandName, dispatch, formik.values, getBrandId]);

  useEffect(() => {
    // if (isLoading) {
    //   <p>Loading...</p>;
    // }
    if (isSuccess && createBrand) {
      toast.success('Brand Added Succesfully');
    }
    if (updatedBrand && isSuccess) {
      toast.success('Brand updated Succesfully');
      navigate('/admin/list-brand'); //from admin go to list-product
    }
    if (isError) {
      toast.error('Something Wrong');
    }
  }, [createBrand, isError, isSuccess, navigate, updatedBrand]);

  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">
          {getBrandId !== undefined ? 'Edit' : 'Add'} Brand
        </h3>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Enter Brand"
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
            <button
              type="submit"
              className="btn bg-green-600 p-4 text-white  my-5 border-0 rounded-lg"
            >
              {getBrandId !== undefined ? 'Update ' : 'Add'} Brand
            </button>
          </form>
        </div>
        <div></div>
      </div>{' '}
    </div>
  );
}

export default AddBrand;

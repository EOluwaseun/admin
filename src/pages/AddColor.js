import React, { useEffect } from 'react';
import CustomInput from '../componets/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'; //validation
import { toast } from 'react-toastify';
import {
  createColors,
  getAColor,
  resetState,
  updateAColor,
} from '../features/color/colorSlice';

let schema = yup.object().shape({
  title: yup.string().required('Color is Required'),
});

function AddColor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getColorId = location.pathname.split('/')[3];
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isLoading,
    isError,
    createdColor,
    colorName,
    updatedColor,
  } = newColor; // this is also picking from d store , so acces to all

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getColorId]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success('Color Added Succesfully');
    }
    if (updatedColor && isSuccess) {
      toast.success('Color Updated Succesfully');
      navigate('/admin/color-list'); //from admin go to list-product
    }
    if (isError) {
      toast.error('Something Wrong');
    }
  }, [createdColor, isError, isSuccess, navigate, updatedColor]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        //the ID from the service, and the
        //colorData is the title
        const data = { id: getColorId, colorData: values };
        dispatch(updateAColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColors(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">
          {getColorId !== undefined ? 'Edit' : 'Add'} Color
        </h3>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="color"
              label="Enter Color"
              name="title"
              val={formik.values.title}
              onCh={formik.handleChange('title')}
              onbl={formik.handleBlur('title')}
              id="color"
              className="h-[500px]"
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
              {getColorId !== undefined ? 'Update' : 'Add'} Color
            </button>
          </form>
        </div>
        <div></div>
      </div>{' '}
    </div>
  );
}

export default AddColor;

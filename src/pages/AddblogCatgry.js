import React, { useEffect } from 'react';
import CustomInput from '../componets/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'; //validation
import { toast } from 'react-toastify';
import {
  createdBlogCat,
  updateABlogCat,
  getABlogCat,
  resetState,
} from '../features/bcategory/bCategorySlice';

let schema = yup.object().shape({
  title: yup.string().required('Title is Required'),
});

function AddBlogCatgry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getBlogcatId = location.pathname.split('/')[3];

  const newBlogcat = useSelector((state) => state.bCatgory);
  const {
    isSuccess,
    isLoading,
    isError,
    blogcat,
    blogcatName,
    updatedBlogcat,
  } = newBlogcat; // this is also picking from d store , so acces to all

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogcatName || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogcatId !== undefined) {
        const data = { id: getBlogcatId, blogCatData: values };
        dispatch(updateABlogCat(data));
      } else {
        dispatch(createdBlogCat(values));
        formik.resetForm();
        dispatch(resetState());
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });
  useEffect(() => {
    if (getBlogcatId !== undefined) {
      dispatch(getABlogCat(getBlogcatId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, formik.values, getBlogcatId]);

  useEffect(() => {
    if (isSuccess && blogcat) {
      toast.success('Blog Category Added Succesfully');
    }
    if (updatedBlogcat && isSuccess) {
      toast.success('Blog Category Added Succesfully');
      navigate('/admin/blog-category-list'); //from admin go to list-product
    }
    if (isError) {
      toast.error('Something Wrong');
    }
  }, [blogcat, isError, isSuccess, navigate, updatedBlogcat]);
  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">Add Blog Category</h3>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Enter Blog Category"
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
              Add Blog Category
            </button>
          </form>
        </div>
        <div></div>
      </div>{' '}
    </div>
  );
}

export default AddBlogCatgry;

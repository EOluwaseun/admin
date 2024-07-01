/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import CustomInput from '../componets/CustomInput';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup'; //validation
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import Dropzone from 'react-dropzone';
import {
  createBlogs,
  resetState,
  getABlog,
  updateABlog,
} from '../features/blog/blogSlice';
import { getblogCat } from '../features/bcategory/bCategorySlice';

let schema = yup.object().shape({
  title: yup.string().required('Title is Required'),
  description: yup.string().required('Description is Required'),
  category: yup.string().required('Category is Required'),
});

function AddBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const [images, setImages] = useState([]);
  const getBlogId = location.pathname.split('/')[3];
  const imgState = useSelector((state) => state.upload.images); //this piacking the payload
  const bcatState = useSelector((state) => state.bCatgory.bcategories);
  const blogState = useSelector((state) => state.blog);

  const {
    isSuccess,
    isLoading,
    isError,
    createdBlogs,
    deletedBlog,
    updatedBlog,
    blogImages,
    blogName,
    blogDesc,
    blogCategory,
  } = blogState;

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
      img.push(blogImages);
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getblogCat());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && createdBlogs) {
      toast.success('Blog Created Succesfully');
    }
    if (isSuccess && updatedBlog) {
      toast.success('Blog Updated Succesfully');
      navigate('/admin/blog-list'); //from admin go to list-product
    }
    if (isError) {
      toast.error('Something Wrong');
    }
  }, [createdBlogs, isError, isSuccess]);

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
  }, [blogImages]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || '',
      description: blogDesc || '',
      category: blogCategory || '',
      images: blogImages || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateABlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogs(values));  
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          // navigate('/admin/blog-list');
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="text-4xl font-bold mb-2">
        {getBlogId !== undefined ? 'Edit' : 'Add'}Blog
      </h3>
      <form className="py-4" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          label="Enter Blog"
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
        <select
          className="py-4 mb-4 w-full mt-3"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange('category')}
          onBlur={formik.handleBlur('category')}
        >
          <option value="">Select Blog Category</option>
          {bcatState.map((i, j) => {
            return (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            );
          })}
        </select>
        <div className="text-red-500 text-start text-[.8rem] mb-3">
          {formik.touched.category && formik.errors.category ? (
            <div>{formik.errors.category}</div>
          ) : null}
        </div>

        <ReactQuill
          theme="snow"
          value={formik.values.description}
          name="description"
          onChange={formik.handleChange('description')}
          // onBlur={formik.handleBlur('description')}
          className="mb-3"
        />
        <div className="text-red-500 text-start text-[.8rem]">
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
        </div>
        <div className="bg-white border mt-3 p-5 text-center cursor-pointer">
          <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="showImages flex flex-wrap gap-2 mt-3">
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
          className="btn bg-green-600 p-4 
            text-white  my-5 border-0 rounded-lg"
        >
          {getBlogId !== undefined ? 'Update' : 'Add'} Blog
        </button>
      </form>
    </div>
  );
}
export default AddBlog;

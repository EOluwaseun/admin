import React, { useEffect } from 'react';
import CustomInput from '../componets/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'; //validation
import { toast } from 'react-toastify';
import {
  createCoupons,
  getACoupon,
  resetState,
  updateACoupon,
} from '../features/coupon/couponSlice';

let schema = yup.object().shape({
  name: yup.string().required('Name is Required'),
  expiry: yup.date().required('Expiry is Required'),
  discount: yup.number().required('Discount is Required'),
});

function AddCoupon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split('/')[3];
  const newCoupon = useSelector((state) => state.coupon);

  const {
    isSuccess,
    isLoading,
    isError,
    createdCoupons,
    couponName,
    couponDiscount,
    couponExpiry,
    updatedCoupon,
  } = newCoupon; // this is also picking from d store , so acces to all
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split('/');
    return [year, month, day].join('-');
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || '',
      expiry: changeDateFormat(couponExpiry) || '',
      discount: couponDiscount || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupons(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getCouponId]);

  useEffect(() => {
    if (isSuccess && createdCoupons) {
      toast.success('Coupon Added Succesfully');
    }
    if (isSuccess && updatedCoupon) {
      toast.success('Coupon updated Succesfully');
      navigate('/admin/coupon-list');
    }
    if (isError && couponName && couponDiscount && couponExpiry) {
      toast.error('Something Wrong');
    }
  }, [
    couponDiscount,
    couponExpiry,
    couponName,
    createdCoupons,
    isError,
    isSuccess,
    navigate,
    updatedCoupon,
  ]);

  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">
          {getCouponId !== undefined ? 'Edit' : 'Add'} Coupon
        </h3>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Enter Name"
              name="name"
              val={formik.values.name}
              onCh={formik.handleChange('name')}
              onbl={formik.handleBlur('name')}
            />
            <div className="text-red-500 text-start text-[.8rem]">
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </div>
            <CustomInput
              type="date"
              label="Enter Expiry date"
              name="expiry"
              val={formik.values.expiry}
              onCh={formik.handleChange('expiry')}
              onbl={formik.handleBlur('expiry')}
            />
            <div className="text-red-500 text-start text-[.8rem]">
              {formik.touched.expiry && formik.errors.expiry ? (
                <div>{formik.errors.expiry}</div>
              ) : null}
            </div>
            <CustomInput
              type="number"
              label="Enter Discount percentage"
              name="discount"
              val={formik.values.discount}
              onCh={formik.handleChange('discount')}
              onbl={formik.handleBlur('discount')}
            />
            <div className="text-red-500 text-start text-[.8rem]">
              {formik.touched.discount && formik.errors.discount ? (
                <div>{formik.errors.discount}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="btn bg-green-600 p-4 text-white  my-5 border-0 rounded-lg"
            >
              {getCouponId !== undefined ? 'Update' : 'Add'} Coupon
            </button>
          </form>
        </div>
        <div></div>
      </div>{' '}
    </div>
  );
}

export default AddCoupon;

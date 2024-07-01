import React, { useEffect } from 'react';
import CustomInput from '../componets/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; //validation
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

let schema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be valid')
    .required('Email is Required'),
  password: Yup.string().required('Password is Required'),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // schema declaration

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values)); //pass user into login
      alert(JSON.stringify(values, null, 2));
    },
  });
  // get the below state from redux
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSuccess) {
      navigate('admin');
    } else {
      // alert('user not found');
      navigate('');
    }
  }, [isSuccess, navigate, user]);
  return (
    <div className="py-3 min-h-screen" style={{ background: '#ffd333' }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-[30%] bg-white rounded-md mx-auto p-4 text-center">
        <div className="mb-2">
          <h3 className="text-4xl font-bold">Login</h3>
          <p>Login to your account to continiue</p>
          {/* message: this is coming from state */}
          <div className="text-red-600 text-center">
            {message.message === 'Rejected' ? 'You are not an admin' : ''}
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="email"
            name="email"
            label="Email Address"
            id="email"
            val={formik.values.email}
            onCh={formik.handleChange('email')}
          />
          <div className="text-red-500 text-start text-[.8rem]">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput
            type="password"
            name="password"
            label="Password"
            id="password"
            val={formik.values.password}
            onCh={formik.handleChange('password')}
          />
          <div className="text-red-500 text-start text-[.8rem]">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="mb-4 text-end">
            <Link to="forgot-password" className="text-blue-600 underline">
              Forgot Password
            </Link>
          </div>
          <button
            className="border px-3 py-2 w-full font-bold text-white"
            style={{ background: '#ffd333' }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

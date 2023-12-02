import React from 'react';
import CustomInput from '../componets/CustomInput';
import { Link } from 'react-router-dom';

function ResetPassword() {
  return (
    <div>
      <div className="py-3 min-h-screen" style={{ background: '#ffd333' }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div className="my-5 w-[30%] bg-white rounded-md mx-auto p-4 text-center">
          <div className="mb-2">
            <h3 className="text-4xl font-bold">Forgot Password</h3>
            <p>Please Enter your email to get reset password link</p>
          </div>

          <form>
            <CustomInput
              type="text"
              placeholder="Email Address"
              id="email"
              label="New Password"
            />

            <Link
              to=""
              className="border px-3 py-2 w-full font-bold text-white"
              style={{ background: '#ffd333' }}
              type="submit"
            >
              Send Link
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

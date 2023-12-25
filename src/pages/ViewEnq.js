import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import {
  getAEnquiry,
  resetState,
  updateAEnquiry,
} from '../features/enquiry/enquirySlice';
import { BiArrowBack } from 'react-icons/bi';

// "gitHead": "19fa58d527ae74f2b6baa0867463eea1d290f9a5"


function ViewEnq() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split('/')[3];
  const enqState = useSelector((state) => state.enquiry);
  const { enqName, enqEmail, enqMobile, enqComment, enqStatus } = enqState;

  useEffect(() => {
    dispatch(getAEnquiry(getEnqId));
  }, [dispatch, getEnqId]);

  // go back
  const goBack = () => {
    navigate(-1);
  };

  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAEnquiry(getEnqId));
    }, 100);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="mb-4 ">View Enquiry</h3>
        <button
          onClick={goBack}
          className="bg-transparent border-0 mb-0 flex items-center gap-2"
        >
          <BiArrowBack /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 flex gap-3 flex-cols rounded-md">
        <div className="flex items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{enqName}</p>
        </div>
        <div className="flex items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <a href={`tel:234+${enqMobile}`} className="mb-0">
            {enqMobile}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <a href={`mailto:${enqEmail}`} className="mb-0">
            {enqEmail}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{enqComment}</p>
        </div>
        <div className="flex items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{enqStatus}</p>
        </div>
        <div className="flex items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              name=""
              defaultValue={enqStatus ? enqStatus : 'Submitted'}
              className=""
              id=""
              onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEnq;

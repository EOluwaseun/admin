import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { getAEnquiry } from '../features/enquiry/enquirySlice';


function ViewEnq() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getEnqId = location.pathname.split('/')[3]
  const enqState = useSelector((state)=>state.enquiry)
const {enqName,enqEmail,enMobile,enqComment, enqStatus} = enqState

useEffect(()=>{
  dispatch(getAEnquiry(getEnqId))
},[dispatch, getEnqId])

// go back
const goBack =()=>{
  navigate(-1)
}
return <div>ViewEnq</div>;
}

export default ViewEnq;

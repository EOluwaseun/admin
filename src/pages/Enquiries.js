import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
  updateAEnquiry,
} from '../features/enquiry/enquirySlice';
import CustomModal from '../componets/CustomModal';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: ' Name',
    dataIndex: 'name',
  },
  {
    title: ' Email',
    dataIndex: 'email',
  },
  {
    title: ' Mobile',
    dataIndex: 'mobile',
  },
  {
    title: ' Status',
    dataIndex: 'status',
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];

function Enquiries() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState(''); //initially empty

  const showModal = (e) => {
    setOpen(true);
    setEnquiryId(e); //set Id into brand
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enquiryState?.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={
              enquiryState[i].status ? enquiryState[i].status : 'Submitted'
            }
            className="w-full p-2"
            onChange={(e) =>
              setEnquryStatus(e.target.value, enquiryState[i]._id)
            }
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),

      action: (
        <div className="flex gap-2 mb-2">
          <Link
            to={`/admin/enquiries/${enquiryState[i]._id}`}
            className="text-red-500"
          >
            <AiOutlineEye />
          </Link>
          <button
            onClick={() => showModal(enquiryState[i]._id)}
            className="text-red-500"
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  const setEnquryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    // update d data
    dispatch(updateAEnquiry(data));
  };
  const deleteEnq = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };
  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">Enquiries</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          open={open}
          performAction={() => deleteEnq(enquiryId)}
          hideModal={hideModal}
          title="Are you sure you want to delete this enquiry"
        />
      </div>{' '}
    </div>
  );
}

export default Enquiries;

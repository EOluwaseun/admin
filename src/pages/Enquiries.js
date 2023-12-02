import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getEnquiries } from '../features/enquiry/enquirySlice';

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
  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enquiryState?.length; i++) {
    data1.push({
      key: i,
      name: enquiryState[i].title,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      status: (
        <>
          <select name="" className="w-full p-2">
            <option value="">Set Status</option>
          </select>
        </>
      ),

      action: (
        <div className="flex gap-2 mb-2">
          <Link to="/" className="text-red">
            <AiFillDelete />
          </Link>
        </div>
      ),
    });
  }
  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">Enquiries</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>{' '}
    </div>
  );
}

export default Enquiries;

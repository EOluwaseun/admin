import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteABrand,
  getBrands,
  resetState,
} from '../features/brand/brandSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
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
    title: 'Action',
    dataIndex: 'action',
  },
];
function BrandList() {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState(''); //initially empty

  const showModal = (e) => {
    setOpen(true);
    setBrandId(e); //set Id into brand
  };
  // console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState()); //anytime this page loads, it has to first RESET OFF AND ON
    dispatch(getBrands()); //remeber to call it
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState?.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i]?.title,
      action: (
        <div className="flex gap-2 mb-2">
          {/* take it back to edit it */}
          <Link to={`/admin/brand/${brandState[i]._id}`}>
            <BiEdit className="text-red-500" />
          </Link>
          <button
            onClick={() => showModal(brandState[i]._id)}
            className="border-0 transparent"
          >
            <AiFillDelete className="text-red-500" />
          </button>
        </div>
      ),
    });
  }
  const deleteAction = (e) => {
    // alert(e);
    setOpen(false);
    dispatch(deleteABrand(e)); // delete the id
    // dispatch(resetState()); //anytime this page loads, it has to first RESET OFF AND ON
    setTimeout(() => {
      dispatch(getBrands()); // after deleting, get brands again dispatch it after 1seconds
    }, 100);
  };

  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">Brands</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          open={open}
          performAction={() => deleteAction(brandId)}
          hideModal={hideModal}
          title="Are you sure you want to delete this brand"
        />
      </div>{' '}
    </div>
  );
}

export default BrandList;

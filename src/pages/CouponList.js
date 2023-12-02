import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import { getBrands } from '../features/brand/brandSlice';
import {
  deleteACoupon,
  getCoupons,
  resetState,
} from '../features/coupon/couponSlice';
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
    title: ' Expiry',
    dataIndex: 'expiry',
  },
  {
    title: ' Discount',
    dataIndex: 'discount',
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];
function CouponList() {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState('');

  const showModal = (e) => {
    setOpen(true);
    setCouponId(e); // set d id to the target
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons()); //remeber to call it
  }, [dispatch]);

  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState?.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i]?.name,
      expiry: new Date(couponState[i]?.expiry).toLocaleString(),
      discount: couponState[i]?.discount,

      action: (
        <div className="flex gap-2 mb-2">
          <Link to={`/admin/coupon/${couponState[i]._id}`}>
            <BiEdit className="text-red-500" />
          </Link>
          {/* when click, show set d coupon id */}
          <button onClick={() => showModal(couponState[i]._id)}>
            <AiFillDelete className="text-red-500" />
          </button>
        </div>
      ),
    });
  }

  const deleteAction = (e) => {
    setOpen(false);
    dispatch(deleteACoupon(e));
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  };

  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">Coupons</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          open={open}
          performAction={() => deleteAction(couponId)}
          hideModal={hideModal}
          title="Are you sure you want to delete this coupon"
        />
      </div>{' '}
    </div>
  );
}

export default CouponList;

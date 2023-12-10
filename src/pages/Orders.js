import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

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
    title: ' Product',
    dataIndex: 'product',
  },
  {
    title: ' Amount',
    dataIndex: 'amount',
  },
  {
    title: ' Date',
    dataIndex: 'date',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
function Orders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders()); //remeber to call it
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].orderby.firstname, // get orderby from orderstate, orderby is populated in order state
      product: <Link to={`/admin/orders/${orderState[i].orderby._id}`}>View Orders</Link>,
      amount: orderState[i].paymentIntent.amount, // need to figure this out amount!
      date: new Date(orderState[i].createdAt).toLocaleString(),

      action: (
        <div className="flex gap-2 mb-2">
          <Link to='/'
            className="text-red"
          >
            <BiEdit />
          </Link>
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
        <h3 className="text-4xl font-bold mb-2">Order List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>{' '}
    </div>
  );
}

export default Orders;

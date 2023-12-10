import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByUser, getOrders } from '../features/auth/authSlice';
import { Link, useLocation } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
  },
  {
    title: ' Brand',
    dataIndex: 'brand',
  },
  {
    title: ' Count',
    dataIndex: 'count',
  },
  {
    title: ' Color',
    dataIndex: 'color',
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
function ViewOrder() {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split('/')[3];

  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, [dispatch, userId]);

  const orderState = useSelector((state) => state.auth.orderbyuser.products);
  console.log(orderState);

  // useEffect(() => {
  //   dispatch(getOrders()); //remeber to call it
  // }, [dispatch]);

  // const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].product.title,
      brand: orderState[i].product.brand,
      count: orderState[i].product.count,
      amount: orderState[i].product.amount,
      color: orderState[i].product.color,
      date: orderState[i].product.createdAt,
      // date: new Date(orderState[i].product.createdAt).toLocaleString(),

      action: (
        <div className="flex gap-2 mb-2">
          <Link to="/" className="text-red">
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
        <h3 className="text-4xl font-bold mb-2">View User order</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>{' '}
    </div>
  );
}

export default ViewOrder;

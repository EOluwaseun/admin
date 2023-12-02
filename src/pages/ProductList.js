import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, resetState } from '../features/product/productSlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: ' Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title?.length - b.title?.length,
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    sorter: (a, b) => a.brand?.length - b.brand?.length,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.category?.length - b.category?.length,
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },

  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
    // sorter:(a,b) => a.price - b.price
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

function ProductList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);

  const data1 = [];
  for (let i = 0; i < productState?.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      price: `$ ${productState[i].price}`,
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
  console.log(data1);

  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">Products</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>{' '}
    </div>
  );
}

export default ProductList;

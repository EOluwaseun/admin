import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAProduct, getProducts, resetState } from '../features/product/productSlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CustomModal from '../componets/CustomModal';

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
  const [open, setOpen] = useState(false)
  const [productId, setProductId] = useState('')

  const showModal = (e)=>{
    setOpen(true)
    setProductId(e)
  }

  const hideModal = ()=>{
    setOpen(false)
  }

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
          <Link to={`/admin/product/${productState[i]._id}`} className="text-red">
            <BiEdit />
          </Link>
          <button
            onClick={()=> showModal(productState[i]._id)}
            className='border-0 transparent'
          >
            <AiFillDelete className="text-red"/>
          </button>
        </div>
      ),
    });
  }
  // console.log(data1);
  const deleteAction = (e)=>{
    setOpen(false)
    dispatch(deleteAProduct(e))
    setTimeout(()=>{
      dispatch(getProducts())
    },100)
  }

  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">Products</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          open={open}
          performAction={()=> deleteAction(productId)}
          hideModal={hideModal}
          title="Are you sure you want to delete this product"
        />
      </div>{' '}
    </div>
  );
}

export default ProductList;

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import {
  getProductCategories,
  deleteAProductCategory,
  resetState,
} from '../features/pcategory/pcategorySlice';
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

function CategoryList() {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState(''); //initially empty

  const showModal = (e) => {
    setOpen(true);
    setpCatId(e); //set Id into brand
  };
  // console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProductCategories());
  }, [dispatch]);

  const pCatState = useSelector((state) => state.category.pCategories);
  const data1 = [];
  for (let i = 0; i < pCatState?.length; i++) {
    data1.push({
      key: i + 1,
      name: pCatState[i]?.title,
      action: (
        <div className="flex gap-2 mb-2">
          {/* take it back to edit it */}
          <Link to={`/admin/category/${pCatState[i]._id}`}>
            <BiEdit className="text-red-500" />
          </Link>
          <button
            onClick={() => showModal(pCatState[i]._id)}
            className="border-0 transparent"
          >
            <AiFillDelete className="text-red-500" />
          </button>
        </div>
      ),
    });
  }

  const deleteProductCat = (e) => {
    // alert(e);
    setOpen(false);
    dispatch(deleteAProductCategory(e)); // delete the id
    // dispatch(resetState()); //anytime this page loads, it has to first RESET OFF AND ON
    setTimeout(() => {
      dispatch(getProductCategories()); // after deleting, get brands again dispatch it after 1seconds
    }, 100);
  };
  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">Product Categories</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          open={open}
          performAction={() => deleteProductCat(pCatId)}
          hideModal={hideModal}
          title="Are you sure you want to delete this product"
        />
      </div>{' '}
    </div>
  );
}

export default CategoryList;

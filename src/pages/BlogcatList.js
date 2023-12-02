import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import {
  getblogCat,
  deleteABlogCat,
  resetState,
} from '../features/bcategory/bCategorySlice';
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

function BlogcatList() {
  const [open, setOpen] = useState(false);
  const [blogCatId, setBlogCatId] = useState('');
  const dispatch = useDispatch();

  const showModal = (e) => {
    setOpen(true);
    setBlogCatId(e); //set Id into brand
  };
  // console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getblogCat());
  }, [dispatch]);

  const bCategoryState = useSelector((state) => state.bCatgory.bcategories);
  const data1 = [];
  for (let i = 0; i < bCategoryState?.length; i++) {
    data1.push({
      key: i,
      name: bCategoryState[i]?.title,
      action: (
        <div className="flex gap-2 mb-2">
          {/* take it back to edit it */}
          <Link to={`/admin/blog-category/${bCategoryState[i]._id}`}>
            <BiEdit className="text-red-500" />
          </Link>
          <button
            onClick={() => showModal(bCategoryState[i]._id)}
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
    dispatch(deleteABlogCat(e)); // delete the id
    // dispatch(resetState()); //anytime this page loads, it has to first RESET OFF AND ON
    setTimeout(() => {
      dispatch(getblogCat()); // after deleting, get brands again dispatch it after 1seconds
    }, 100);
  };
  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">Blog Category List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          open={open}
          performAction={() => deleteAction(blogCatId)}
          hideModal={hideModal}
          title="Are you sure you want to delete this blog category"
        />
      </div>{' '}
    </div>
  );
}

export default BlogcatList;

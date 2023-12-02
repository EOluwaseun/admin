import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { deleteABlog, getBlogs, resetState } from '../features/blog/blogSlice';
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
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
function BlogList() {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState(''); //initially empty

  const showModal = (e) => {
    setOpen(true);
    setBlogId(e); //set Id into brand
  };
  // console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, [dispatch]);

  const getBlogState = useSelector((state) => state.blog.blogs);

  const data1 = [];
  for (let i = 0; i < getBlogState?.length; i++) {
    data1.push({
      key: i + 1,
      name: getBlogState[i].title,
      category: getBlogState[i].category,
      action: (
        <div className="flex gap-2 mb-2">
          {/* take it back to edit it */}
          <Link to={`/admin/add-blogs/${getBlogState[i]._id}`}>
            <BiEdit className="text-red-500" />
          </Link>
          <button
            onClick={() => showModal(getBlogState[i]._id)}
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
    dispatch(deleteABlog(e)); // delete the id
    // dispatch(resetState()); //anytime this page loads, it has to first RESET OFF AND ON
    setTimeout(() => {
      dispatch(getBlogs()); // after deleting, get brands again dispatch it after 1seconds
    }, 100);
  };
  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">Blog List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          open={open}
          performAction={() => deleteAction(blogId)}
          hideModal={hideModal}
          title="Are you sure you want to delete this blog"
        />
      </div>{' '}
    </div>
  );
}

export default BlogList;

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import {
  deleteAColor,
  getColors,
  resetState,
} from '../features/color/colorSlice';
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

function ColorList() {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState('');

  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, [dispatch]);

  const pColorState = useSelector((state) => state.color.pColors);
  const data1 = [];
  for (let i = 0; i < pColorState?.length; i++) {
    data1.push({
      key: i + 1,
      name: pColorState[i].title,
      action: (
        <div className="flex gap-2 mb-2">
          <Link to={`/admin/color/${pColorState[i]._id}`} className="text-red">
            <BiEdit className="text-red-500" />
          </Link>
          <button
            type="submit"
            onClick={() => showModal(pColorState[i]._id)}
            className="text-red"
          >
            <AiFillDelete className="text-red-500" />
          </button>
        </div>
      ),
    });
  }
  const deleteAction = (e) => {
    setOpen(false);
    dispatch(deleteAColor(e));
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };
  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold mb-2">Color List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          open={open}
          performAction={() => deleteAction(colorId)}
          hideModal={hideModal}
          title="Are you sure you want to delete this color"
        />
      </div>{' '}
    </div>
  );
}

export default ColorList;

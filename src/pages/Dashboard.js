import React, { useEffect, useState } from 'react';
import { BsArrowDownRight, BsArrowRight } from 'react-icons/bs';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';

function Dashboard() {
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
      title: 'Products',
      dataIndex: 'product',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      name: `Edward King ${i}`,
      product: 32,
      status: `London, Park Lane no. ${i}`,
    });
  }

  const data = [
    {
      type: 'Jan',
      sales: 38,
    },

    {
      type: 'Feb',
      sales: 52,
    },
    {
      type: 'Mar',
      sales: 61,
    },
    {
      type: 'Apr',
      sales: 145,
    },
    {
      type: 'May',
      sales: 48,
    },
    {
      type: 'Jun',
      sales: 38,
    },
    {
      type: 'Jly',
      sales: 38,
    },
    {
      type: 'Aug',
      sales: 38,
    },
    {
      type: 'Spt',
      sales: 38,
    },
    {
      type: 'Oct',
      sales: 38,
    },
    {
      type: 'Nov',
      sales: 38,
    },
    {
      type: 'Dec',
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return '#ffd333';
    },
    label: {
      position: 'middle',

      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };

  // eslint-disable-next-line no-unreachable
  return (
    <div>
      <h3 className="mb-4 text-4xl font-bold">Dashboard</h3>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex bg-white p-3 rounded-md flex-grow-1 justify-between items-center">
          <div className="">
            <p>Total</p> <h4 className="text-2xl">$1200</h4>
          </div>
          <div className="flex flex-col items-end">
            <h4 className="font-bold flex gap-1">
              <BsArrowDownRight /> 25%
            </h4>
            <p>Compare To April 2022</p>
          </div>
        </div>
        <div className="flex bg-white p-3 rounded-md flex-grow-1 justify-between items-center">
          <div className="">
            <p>Total</p> <h4 className="text-2xl">$1200</h4>
          </div>
          <div className="flex flex-col items-end">
            <h4 className="font-bold flex gap-1">
              <BsArrowDownRight /> 25%
            </h4>
            <p>Compare To April 2022</p>
          </div>
        </div>
        <div className="flex bg-white p-3 rounded-md flex-grow-1 justify-between items-center">
          <div className="">
            <p>Total</p> <h4 className="text-2xl">$1200</h4>
          </div>
          <div className="flex flex-col items-end">
            <h4 className="font-bold flex gap-1">
              <BsArrowDownRight /> 25%
            </h4>
            <p className="">Compare To April 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-4xl font-bold mb-2">Income Statics</h3>
        <div>
          <Column {...config} />;
        </div>
      </div>
      <div>
        <h3 className="text-4xl font-bold mb-2">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

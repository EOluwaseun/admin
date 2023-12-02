/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import avater from '../assests/avatar4.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import { IoIosNotifications } from 'react-icons/io';
import { RiCouponLine } from 'react-icons/ri';
import { Outlet, useNavigate } from 'react-router';

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    // prevent from inspecting your code
    <Layout onContextMenu={(e) => e.preventDefault()}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="p-4 text-center bg-[#ffd333]">
          <span className="text-4xl text-white font-bold">AJ</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === 'signout') {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard size={25} />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser size={25} />,
              label: 'Custormers',
            },
            {
              key: 'catalog',
              icon: <AiOutlineShoppingCart size={25} />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <AiOutlineDashboard size={25} />,
                  label: 'Add Product',
                },
                {
                  key: 'list-product',
                  icon: <AiOutlineDashboard size={25} />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <AiOutlineDashboard size={25} />,
                  label: 'Brand',
                },
                {
                  key: 'list-brand',
                  icon: <AiOutlineDashboard size={25} />,
                  label: 'Brand List ',
                },
                {
                  key: 'category',
                  icon: <AiOutlineDashboard size={25} />,
                  label: 'Category',
                },
                {
                  key: 'list-category',
                  icon: <AiOutlineDashboard size={25} />,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <AiOutlineDashboard size={25} />,
                  label: 'Colors',
                },
                {
                  key: 'color-list',
                  icon: <AiOutlineDashboard size={25} />,
                  label: 'Color List',
                },
              ],
            },
            {
              key: 'orders',
              icon: <AiOutlineDashboard size={25} />,
              label: 'Orders',
            },
            {
              key: 'blogs',
              icon: <AiOutlineDashboard size={25} />,
              label: 'Blog',
              children: [
                {
                  key: 'add-blogs',
                  icon: <AiOutlineDashboard size={25} />,
                  label: 'Add blog ',
                },
                {
                  key: 'blog-list',
                  icon: <AiOutlineDashboard size={25} />,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <AiOutlineDashboard size={25} />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <AiOutlineDashboard size={25} />,
                  label: 'Blog Category List',
                },
              ],
            },
            {
              key: 'marketing',
              icon: <AiOutlineDashboard size={25} />,
              label: 'Marketing',
              children: [
                {
                  key: 'coupon',
                  icon: <RiCouponLine size={25} />,
                  label: 'Add Coupon ',
                },
                {
                  key: 'coupon-list',
                  icon: <AiOutlineDashboard size={25} />,
                  label: 'Coupon List',
                },
              ],
            },
            {
              key: 'enquiries',
              icon: <AiOutlineDashboard size={25} />,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex justify-between items-center"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="flex gap-3 items-center px-2">
            <div className="cursor-pointer flex relative max-w-[50px]">
              <IoIosNotifications className="text-2xl" />
              <div
                className="bg-yellow-500 absolute -right-2 -bottom-2 text-[12px]
              w-[18px] h-[18px] text-white rounded-full flex justify-center items-center"
              >
                1
              </div>
            </div>

            <div className="flex gap-4 justify-between items-center">
              <div>
                <img src={avater} alt="avater" />
              </div>
              <div className=" flex gap-2 items-center">
                <h5 className="text-2xl">AJ</h5>
                <p>admin@gmail.com</p>
              </div>
              <div>
                <button
                  id="dropdownHoverButton"
                  data-dropdown-toggle="dropdownHover"
                  data-dropdown-trigger="hover"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Dropdown hover{' '}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownHover"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownHoverButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <main>
            <ToastContainer
              position="bottom-center"
              // position="top-right"
              limit={1}
              autoClose={250}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="light"
            />
            <Outlet />
          </main>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;

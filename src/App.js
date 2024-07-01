import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './componets/MainLayout';
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogcatList from './pages/BlogcatList';
import AddBlog from './pages/AddBlog';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import ColorList from './pages/ColorList';
import AddColor from './pages/AddColor';
import CategoryList from './pages/CategoryList';
import BrandList from './pages/BrandList';
import ProductList from './pages/ProductList';
import AddCat from './pages/AddCat';
import AddBlogCatgry from './pages/AddblogCatgry';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import CouponList from './pages/CouponList';
import AddCoupon from './pages/AddCoupon';
import ViewEnq from './pages/ViewEnq';
import ViewOrder from './pages/ViewOrder';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          {/* index means slash admin */}
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="blog-category-list" element={<BlogcatList />} />
          <Route path="add-blogs" element={<AddBlog />} />
          <Route path="add-blogs/:id" element={<AddBlog />} />
          <Route path="blog-category" element={<AddBlogCatgry />} />
          <Route path="blog-category/:id" element={<AddBlogCatgry />} />
          <Route path="coupon-list" element={<CouponList />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="color-list" element={<ColorList />} />
          <Route path="color" element={<AddColor />} />
          <Route path="color/:id" element={<AddColor />} />
          <Route path="list-category" element={<CategoryList />} />
          <Route path="category" element={<AddCat />} />
          <Route path="category/:id" element={<AddCat />} />
          <Route path="list-brand" element={<BrandList />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="brand/:id" element={<AddBrand />} />
          <Route path="list-product" element={<ProductList />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="product/:id" element={<AddProduct />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;

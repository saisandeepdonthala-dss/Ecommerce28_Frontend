import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyOtp from './pages/VerifyOtp'

import Navbar from './pages/Navbar'
import ProtectedRoute from './pages/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import AdminProducts from './pages/AdminProducts'
import SingleProduct from './pages/SingleProduct'
import EditProduct from './pages/EditProduct'
import PageNotFound from './pages/PageNotFound'
import UserDashboard from './pages/User/UserDashboard'
// user routes
import UserProtectedRoute from "./pages/User/UserProtectedRoute";
import Cart from './pages/User/Cart'
import UserProduce from './pages/User/UserProduce'
import Payment from './pages/User/Payment'
import MyOrders from "./pages/User/MyOrders";
import OrderDetails from "./pages/User/OrderDetails";
import ForgotPassword from "./pages/User/ForgotPassword";
import ResetPassword from "./pages/User/ResetPassword";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import AdminResetPassword from "./pages/AdminResetPassword";


function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/dashboard"
          element={

            <ProtectedRoute>
              <Dashboard />

            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>


          }
        />
        <Route path="/contact" element={<Contact />} />



        <Route
          path="/login"
          element={<Login />}
        />

        

        <Route 
        path="/admin/forgot-password" 
        element={<AdminForgotPassword />} />

      <Route 
      path="/admin/reset-password/:token"
       element={<AdminResetPassword />} />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* OTP ROUTE */}

        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />

        
        

        {/* ADMIN ROUTES */}

        <Route
          path="/add-product"
          element={

            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>

          }
        />

        <Route
          path="/admin-products"
          element={

            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>

          }
        />

        <Route
          path="/single/:id"
          element={

            <ProtectedRoute>
              <SingleProduct />
            </ProtectedRoute>

          }
        />

        <Route
          path="/edit/:id"
          element={

            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>

          }
        />
        <Route
          path="*"
          element={<PageNotFound />} />
        {/* user */}


        <Route
          path="/user-dashboard"
          element={
            <UserProtectedRoute>
              <UserDashboard />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/produce"
          element={
            <UserProtectedRoute>
              <UserProduce />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <UserProtectedRoute>
              <Cart />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <UserProtectedRoute>
              <Payment />
            </UserProtectedRoute>
          }
        />


        <Route
          path="/my-orders"
          element={
            <UserProtectedRoute>
              <MyOrders />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/order/:orderid"
          element={
            <UserProtectedRoute>
              <OrderDetails />
              
            </UserProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
           element={
           <ForgotPassword />
          
           }/>

      <Route
  path="/resetpassword/:token"
  element={<ResetPassword />}
/>
      </Routes>


    </BrowserRouter>

  )
}

export default App
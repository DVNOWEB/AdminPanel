import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import './App.scss'

import LoginAdmin from './pages/admin/loginAdmin/LoginAdmin'
import RegisterAdmin from './pages/admin/registerAdmin/RegisterAdminPage'
import Home from './pages/home/Home'
import Admin from './pages/admin/Admin'
import AddProduct from './pages/admin/addProduct/AddProduct'
import Orders from './pages/admin/orders/Orders'
import Products from './pages/products/Products'


import Header from './components/header/Header'
import ProductDetails from './components/details/ProductDetails'
import OrderDetails from './components/details/OrderDetails'


// Firebase
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'
import { useDispatch, useSelector } from 'react-redux'
import { authReady } from './store/features/auth/authSlice'

const App = () => {
  const { authIsReady } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // const isAdmin = admin && admin.isAdmin

  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      console.log(_user)
      let admin = null

      if (_user) {
        admin = {
          uid: _user.uid,
          email: _user.email,
        }
      }

      dispatch(authReady(admin))
    })
  }, [dispatch])

  return (
    <>
      {authIsReady ? (
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
            <Route path="/register-admin" element={<RegisterAdmin />} />
            <Route path="/admin-panel" element={<Admin />} />
            <Route path="/admin-panel" element={<Products />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </Router>
      ) : null}
    </>
  )
}

export default App

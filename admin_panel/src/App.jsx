import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import './App.scss'

import Header from './components/header/Header'
import GoogleBtn from './components/googleBtn/GoogleBtn'
import LoginAdmin from './pages/admin/loginAdmin/LoginAdmin'
import RegisterAdmin from './pages/admin/registerAdmin/RegisterAdminPage'
import Admin from './pages/admin/Admin'
import AddProduct from './pages/admin/addProduct/AddProduct'
import Orders from './pages/admin/orders/Orders'


// Firebase
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'
import { useDispatch, useSelector } from 'react-redux'
import { authReady } from './store/features/auth/authSlice'

const App = () => {
  const { authIsReady, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const isAdmin = user && user.isAdmin

  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      console.log(_user)
      let user = null

      if (_user) {
        user = {
          uid: _user.uid,
          email: _user.email,
        }
      }

      dispatch(authReady(user))
    })
  }, [dispatch])

  return (
    <>
      {authIsReady ? (
        <Router>
          <Header />
          <Routes>
            <Route path="/login-admin" element={<LoginAdmin />} />
            <Route path="/register-admin" element={<RegisterAdmin />} />
            <Route isAdmin={isAdmin} path="/admin-panel" element={<Admin />} />
            <Route
              isAdmin={isAdmin}
              path="/addProduct"
              element={<AddProduct />}
            />
            <Route isAdmin={isAdmin} path="/orders" element={<Orders />} />
          </Routes>
        </Router>
      ) : null}
    </>
  )
}

export default App

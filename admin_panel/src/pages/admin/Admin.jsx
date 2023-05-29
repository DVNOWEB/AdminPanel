import React from 'react'
import AdminPanel from '../../components/adminPanel/AdminPanel'
import Products from '../products/Products'
import Orders from './orders/Orders'

const Admin = () => {

  return (
    <>  
     <AdminPanel />
     <Products />
     <Orders />
    </>
  )
}

export default Admin

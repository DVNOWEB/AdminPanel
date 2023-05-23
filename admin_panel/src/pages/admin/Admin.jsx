import React from 'react'
import AdminPanel from '../../components/adminPanel/AdminPanel'
import AddProduct from './addProduct/AddProduct'
import Orders from './orders/Orders'


const Admin = () => {
  return (
    <>  
     <AdminPanel />
     <AddProduct />
     <Orders />
    </>
  )
}

export default Admin

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../../store/features/products/productListSlice'
import { useNavigate } from 'react-router-dom'

const orders = () => {

  const { admin } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!admin) {
      navigate('/login-admin')
    }
  }, [admin, navigate])

  return (
    <div>Orders</div>
  )
}

export default orders
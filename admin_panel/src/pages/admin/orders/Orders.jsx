import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../../store/features/orders/orderSlice'
import OrderCard from '../../../components/orderCard/OrderCard'


const Orders = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders())
  }, [])

  const { orders, loading, error } = useSelector((state) => state.orders)

  return (
    <div className="order_container">
      <h2 className="order-title">All Orders</h2>
      <div className="order-collection">
        {orders.map((order, i) => (
          <OrderCard
            key={i}
            order={order}
          />
        ))}
      </div>
    </div>
  )
}

export default Orders
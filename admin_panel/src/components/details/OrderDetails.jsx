import React from 'react'
import useDoc from '../../hooks/useDoc'
import { Link, useParams } from 'react-router-dom'
import Loader from '../loader/Loader'
import './OrderDetails.scss'

const OrderDetails = () => {
  const { id } = useParams()
  const { data, error, loading } = useDoc('orders', id)

  if (!data)
    return (
      <div>
        {loading && <Loader />}
        {error && <p>{error}</p>}
      </div>
    )

  return (
    <div className="main_container">
      <section className="order_details-container">
        {data.item.map((item, i) => (
          <div className="detail_items" key={i}>
            <div className="left_side-box">
              <img src={item.imageURL} alt={item.name} />
            </div>
            <div className="right_side-box">
              <p>Name: {item.name}</p>
              <p>Size: {item.size}</p>
              <p>Price: {item.price} kr</p>
              <p>Quantity: {item.quantity}</p>
              <Link to={`/orders`}>
                <button className="btn-back">Back to orders</button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default OrderDetails

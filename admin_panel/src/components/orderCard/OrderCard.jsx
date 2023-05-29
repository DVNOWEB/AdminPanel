import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  deleteOrder,
  updateOrder,
} from '../../store/features/orders/orderSlice'
import { FaTrashAlt } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'

const OrderCard = ({ order }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editedStatus, setEditedStatus] = useState(order.status)

  const handleDelete = () => {
    dispatch(deleteOrder(order.id))
  }

  const handleEdit = () => {
    if (isEditing) {
      // Save the edited values
      dispatch(
        updateOrder({
          id: order.id,
          status: editedStatus,
        })
      )
    }

    setIsEditing(!isEditing)
  }

  const handleStatusChange = (e) => {
    setEditedStatus(e.target.value)
  }

  return (
    <div className="product_item">
      <div className="left_box">
        <div className="product-name">
          {isEditing ? (
            <input
              type="text"
              value={editedStatus}
              onChange={handleStatusChange}
            />
          ) : (
          <>
            <h5>{order.status}</h5>
            
                  {order.item.map((item, i) => (
                    <div key={i}>
                      <img src={item.imageURL} alt={item.name} />
                      <p>Item Name: {item.name}</p>
                      <p>Item Price: {item.price} kr</p>
                      <p>Item Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                  ))}
            </>
          )}
          

        </div>
      </div>

      <div className="right_box">
        <div className="product-description">
          <p>{order.name}</p>

          <div className="productList-btns">
            <button className="edit-btn" onClick={handleEdit}>
              {isEditing ? <FaCheck /> : <MdModeEdit />}
            </button>

            <button className="delete-btn" onClick={handleDelete}>
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard

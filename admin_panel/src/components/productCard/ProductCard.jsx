import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaTrashAlt } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'
import {
  deleteProduct,
  updateProduct,
} from '../../store/features/products/productListSlice'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(product.name)
  const [editedPrice, setEditedPrice] = useState(product.price)
  const [editedDescription, setEditedDescription] = useState(
    product.description
  )

  const handleDelete = () => {
    dispatch(deleteProduct(product.id))
  }

  const handleEdit = () => {
    if (isEditing) {
      // Save the edited values
      dispatch(
        updateProduct({
          id: product.id,
          name: editedName,
          price: editedPrice,
          description: editedDescription,
        })
      )
    }

    setIsEditing(!isEditing)
  }

  const handleNameChange = (e) => {
    setEditedName(e.target.value)
  }

  const handlePriceChange = (e) => {
    setEditedPrice(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value)
  }

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
  }

  return (
    <div className="product_item">
      <div className="left_box">
        <div className="product_img">
          <img src={product.imageURL} alt={product.name} />
        </div>

        <div className="product-name">
          {isEditing ? (
            <input type="text" value={editedName} onChange={handleNameChange} />
          ) : (
            <h5>{product.name}</h5>
          )}
        </div>
      </div>


      <div className="right_box">
      <div className="product-description">
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={handleDescriptionChange}
          />
        ) : (
          <p>{truncateDescription(product.description, 50)}</p>
        )}
      </div>


        <div className="productList-btns">
          <div className="product-price">
            {isEditing ? (
              <input
                type="number"
                value={editedPrice}
                onChange={handlePriceChange}
              />
            ) : (
              <span>{product.price} kr</span>
            )}
          </div>

          <button className="edit-btn" onClick={handleEdit}>
            {isEditing ? <FaCheck /> : <MdModeEdit />}
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
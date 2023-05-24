import React from 'react'
import '../../pages/products/Products.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FaTrashAlt } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'


const ProductCard = ({ product }) => {

  const dispatch = useDispatch()
  
  return (
    <div className="product_item">
      <div className="product_img">
        <img src={product.imageURL} alt={product.name} />
      </div>

      <div className="product-name">
        <h5>{product.name}</h5>
      </div>

      <div className="product-price">
        <span>{product.price} kr</span>
      </div>

      <div className="productList-btns">
        <button className='edit-btn'><MdModeEdit /></button>

        <button className='delete-btn'>
          <FaTrashAlt />
        </button>
      </div>
    </div>
  )
}
export default ProductCard
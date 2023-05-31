import ProductCard from '../../components/productCard/ProductCard'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../store/features/products/productListSlice'
import AddProduct from '../admin/addProduct/AddProduct'

const Products = () => {
  const dispatch = useDispatch()
  const [isAddProductExpanded, setIsAddProductExpanded] = useState(false)

  const toggleAddProduct = () => {
    setIsAddProductExpanded((prevState) => !prevState)
  }

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const { products, loading, error } = useSelector((state) => state.productList)

  return (
    <div className="products_container">
      <h2 className="products-title">All our products</h2>
      <div className="add-product">
        <button className="add-btn" onClick={toggleAddProduct}>
          Add New Product
        </button>{' '}
      </div>
        {isAddProductExpanded && <AddProduct />}{' '}
      <div className="products-collection">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
export default Products

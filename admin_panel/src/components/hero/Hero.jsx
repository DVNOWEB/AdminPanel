import React, { useState, useEffect } from 'react'
import './Hero.scss'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

const Hero = ({ products }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage()
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [products])


  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    )
  }

  if (products.length === 0) {
    return null
  }

  const currentProduct = products[currentImageIndex]
  const imageURL = currentProduct ? currentProduct.imageURL : ''

  return (
    <div className="container_hero">
      <div className="row_hero">
        <div className="hero_image">
          <img src={imageURL} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Hero

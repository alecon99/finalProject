import React from 'react'
import NavigationBar from '../components/navigationBar/NavigationBar'
import CardDetail from '../components/productCards/cardDetail/CardDetail'
import OffcanvasCart from '../components/offcanvasCart/OffcanvasCart'
import Homebutton from '../components/buttons/homeButton/Homebutton'

const ProductDetailPage = () => {
  return (
    <>
      <NavigationBar/>
      <OffcanvasCart/>
      <CardDetail/>
      <Homebutton/>
    </>
  )
}

export default ProductDetailPage
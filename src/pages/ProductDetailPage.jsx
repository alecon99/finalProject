import React from 'react'
import Footer from '../components/footer/Footer'
import NavigationBar from '../components/navigationBar/NavigationBar'
import CardDetail from '../components/productCards/cardDetail/CardDetail'

const ProductDetailPage = () => {
  return (
    <>
      <NavigationBar/>
      <CardDetail/>
      <Footer/>
    </>
  )
}

export default ProductDetailPage
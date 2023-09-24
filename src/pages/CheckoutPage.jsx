import React from 'react'
import SimplifiedNavigationBar from '../components/navigationBar/SimplifiedNavigatioBar'
import ProductCartCard from '../components/offcanvasCart/productCartCard/ProductCartCard'
import Checkout from '../components/checkout/Checkout'

const CheckoutPage = () => {
  return (
    <>
      <SimplifiedNavigationBar/>
      <Checkout/>
    </>
  )
}

export default CheckoutPage
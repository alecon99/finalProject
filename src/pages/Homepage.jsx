import React from 'react'

import NavigationBar from '../components/navigationBar/NavigationBar'
import Footer from '../components/footer/Footer'
import Jumbotron from '../components/jumbotron/Jumbotron'
import Cards from '../components/productCards/cards/Cards'
import PageButton from '../components/buttons/pageButton/PageButton'
import OffcanvasCart from '../components/offcanvasCart/OffcanvasCart'
import CartButton from '../components/buttons/cartButton/CartButton'

const Homepage = () => {

  return (
    <>
      <NavigationBar />
      <OffcanvasCart />
      <Jumbotron />
      <Cards />
      <PageButton />
      <CartButton />
      <Footer />
    </>
  )
}

export default Homepage
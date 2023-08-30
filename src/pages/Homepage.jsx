import React from 'react'
import NavigationBar from '../components/navigationBar/NavigationBar'
import Footer from '../components/footer/Footer'
import Jumbotron from '../components/jumbotron/Jumbotron'
import Cards from '../components/productCards/cards/Cards'

const Homepage = () => {
  return (
    <>
        <NavigationBar/>
        <Jumbotron/>
        <Cards/>
        <Footer/>
    </>
  )
}

export default Homepage
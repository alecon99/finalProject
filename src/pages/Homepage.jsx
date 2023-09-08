import React from 'react'
import NavigationBar from '../components/navigationBar/NavigationBar'
import Footer from '../components/footer/Footer'
import Jumbotron from '../components/jumbotron/Jumbotron'
import Cards from '../components/productCards/cards/Cards'
import PageButton from '../components/buttons/pageButton/PageButton'

const Homepage = () => {
  
  return (
    <>
        <NavigationBar/>
        <Jumbotron/>
        <Cards/>
        <PageButton/>
        <Footer/>
    </>
  )
}

export default Homepage
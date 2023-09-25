import React from 'react'

import NavigationBar from '../components/navigationBar/NavigationBar'
import ManageProduct from '../components/manage/manageProduct/ManageProduct'
import ModalModifyProduct from '../components/manage/manageProduct/modalModifyProduct/ModalModifyProduct'
import OffcanvasCart from '../components/offcanvasCart/OffcanvasCart'
import HomeButton from '../components/buttons/homeButton/Homebutton'

const ManageProductPage = () => {
  return (
    <>
      <NavigationBar/>
      <OffcanvasCart />
      <ManageProduct/>
      <ModalModifyProduct/>
      <HomeButton/>
    </>
  )
}

export default ManageProductPage
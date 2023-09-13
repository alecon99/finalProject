import React from 'react'
import NavigationBar from '../components/navigationBar/NavigationBar'
import ManageProduct from '../components/manageProduct/ManageProduct'
import ModalModifyProduct from '../components/manageProduct/modalModifyProduct/ModalModifyProduct'

const ManageProductPage = () => {
  return (
    <>
      <NavigationBar/>
      <ManageProduct/>
      <ModalModifyProduct/>
    </>
  )
}

export default ManageProductPage
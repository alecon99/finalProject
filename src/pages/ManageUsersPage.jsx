import React from 'react'

import NavigationBar from '../components/navigationBar/NavigationBar'
import ManageUser from '../components/manage/manageUser/ManageUser'
import OffcanvasCart from '../components/offcanvasCart/OffcanvasCart'
import Homebutton from '../components/buttons/homeButton/Homebutton'

const ManageUserPage = () => {
  return (
    <>
        <NavigationBar/>
        <OffcanvasCart />
        <ManageUser/>
        <Homebutton/>
    </>
  )
}

export default ManageUserPage
import React from 'react'

import NavigationBar from '../components/navigationBar/NavigationBar'
import UserData from '../components/user/userData/UserData'
import OffcanvasCart from '../components/offcanvasCart/OffcanvasCart'
import HomeButton from '../components/buttons/homeButton/Homebutton'

const UserDataPage = () => {
  return (
    <>
      <NavigationBar />
      <OffcanvasCart />
      <UserData />
      <HomeButton />
    </>
  )
}

export default UserDataPage
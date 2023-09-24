import React from 'react'
import NavigationBar from '../components/navigationBar/NavigationBar'
import OffcanvasCart from '../components/offcanvasCart/OffcanvasCart'
import UserOrder from '../components/user/userOrders/UserOrder'
import Homebutton from '../components/buttons/homeButton/Homebutton'

const UserOrdersPage = () => {
    return (
        <>
            <NavigationBar />
            <OffcanvasCart />
            <UserOrder/>
            <Homebutton/>
        </>
    )
}

export default UserOrdersPage
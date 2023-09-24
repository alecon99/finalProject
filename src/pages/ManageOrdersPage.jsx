import React from 'react'

import NavigationBar from '../components/navigationBar/NavigationBar'
import OffcanvasCart from '../components/offcanvasCart/OffcanvasCart'
import ManageOrder from '../components/manage/manageOrder/ManageOrder'
import Homebutton from '../components/buttons/homeButton/Homebutton'

const ManageOrdersPage = () => {
    return (
        <>
            <NavigationBar />
            <OffcanvasCart />
            <ManageOrder />
            <Homebutton />
        </>
    )
}

export default ManageOrdersPage
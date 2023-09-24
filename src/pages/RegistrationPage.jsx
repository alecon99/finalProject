import React from 'react'
import SimplifiedNavigationBar from '../components/navigationBar/SimplifiedNavigatioBar'
import RegistrationForm from '../components/registrationForm/RegistrationForm'
import Homebutton from '../components/buttons/homeButton/Homebutton'

const RegistrationPage = () => {
  return (
    <>
        <SimplifiedNavigationBar />
        <RegistrationForm/>
        <Homebutton/>
    </>
  )
}

export default RegistrationPage
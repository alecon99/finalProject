import React from 'react'
import LoginForms from '../components/loginForm/LoginForm'
import SimplifiedNavigatioBar from '../components/navigationBar/SimplifiedNavigatioBar'
import Homebutton from '../components/buttons/homeButton/Homebutton'

const Loginpage = () => {
  return (
    <>
      <SimplifiedNavigatioBar/>
      <LoginForms/>
      <Homebutton/>
    </>
  )
}

export default Loginpage
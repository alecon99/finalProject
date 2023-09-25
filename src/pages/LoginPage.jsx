import React from 'react'

import LoginForms from '../components/forms/loginForm/LoginForm'
import SimplifiedNavigatioBar from '../components/navigationBar/SimplifiedNavigatioBar'
import Homebutton from '../components/buttons/homeButton/Homebutton'

const LoginPage = () => {
  return (
    <>
      <SimplifiedNavigatioBar/>
      <LoginForms/>
      <Homebutton/>
    </>
  )
}

export default LoginPage
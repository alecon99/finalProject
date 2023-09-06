import React from 'react'
import LoginForms from '../components/loginForm/LoginForm'
import Footer from '../components/footer/Footer'
import SimplifiedNavigatioBar from '../components/navigationBar/SimplifiedNavigatioBar'

const Loginpage = () => {
  return (
    <>
      <SimplifiedNavigatioBar/>
      <LoginForms/>
      <Footer/>
    </>
  )
}

export default Loginpage
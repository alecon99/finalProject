import React from 'react'
import '../navigationBar/NavigationBar.css'

/* reactBootstrap */
import { Container } from 'react-bootstrap'

const NavigationBar = () => {
  return (
    <div id='nav_container'>
        <Container id='nav_items'>
            <div>user</div>
            <div>logo</div>
            <div>menu</div>
        </Container>
    </div>
    
  )
}

export default NavigationBar
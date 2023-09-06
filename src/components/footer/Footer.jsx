import React from 'react'
import '../footer/Footer.css'
import { Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <div className='bg-black text-white'> 
        <Container id='footer_container'>
            <div className='fs-2'>NewLIfe</div>
        </Container>
    </div>
  )
}

export default Footer
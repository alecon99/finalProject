import React from 'react'

import { Col, Container, Row } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <div className='bg-black text-white'>
      <Container className='text-center'>
        <Row>
          <Col xs={6} md={3} >
            <div className='py-2 py-md-3 hover_link '>ABOUT US</div>
          </Col>
          <Col xs={6} md={3}>
            <div className='py-2 py-md-3 hover_link'>PRODUCTS</div>
          </Col>
          <Col xs={6} md={3}>
            <div className='py-2 py-md-3 hover_link'>HELP</div>
          </Col>
          <Col xs={6} md={3}>
            <div className='py-2 py-md-3 hover_link'>CONTACT</div>
          </Col>
        </Row>
        <div className='d-flex justify-content-center align-items-center p-3 p-md-4 border-top'>
          <div className='fs-2 me-5'>NewLife</div>
          <div className='fs-4'>
            <FontAwesomeIcon icon={faInstagram} className='hover_link' />
            <FontAwesomeIcon icon={faFacebook} className='mx-3 hover_link' />
            <FontAwesomeIcon icon={faTiktok} className='hover_link' />
          </div>
        </div>
        <div className='text-secondary pb-2 font_size_xs'>Copyright © 2023, NewLife</div>
      </Container>
    </div>
  )
}

export default Footer
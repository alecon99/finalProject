import React from 'react'
import '../jumbotron/Jumbotron.css'
import { Col, Container, Row } from 'react-bootstrap'

const Jumbotron = () => {
  return (
    <div id='jumbotron_container'>
      <Container>
        <Row>
          <Col sm="7" >
            <Container id='jumbotron_text_container'>
              <div id='jumbotron_text'>
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quisquam? Accusantium laudantium minima illo perferendis nobis placeat ipsum nostrum ducimus consequatur maxime sunt sit rem, amet vel, voluptate, alias non"
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Jumbotron
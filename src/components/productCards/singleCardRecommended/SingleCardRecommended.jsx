import React from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import '../singleCardRecommended/SingleCardRecommended.css';

const SingleCardRecommended = ({ productProps }) => {

  return (
    <Link to={`/detail/${productProps._id}`} target='_blank' className='text-decoration-none'>
      <Card className='border-0 my-3' >
        <div id='container_recommended_img' className='border'>
          {productProps.availability ?
            null
            :
            <div id='not_available_recommended' className='bg-danger p-2 rounded-4 text-white'>Sold out</div>
          }
          <Card.Img id='card_recommended_img' className='rounded-0' src={productProps.image} alt={productProps.name} />
        </div>
        <Card.Body className='p-0'>
          <div className='d-flex justify-content-between'>
            <Card.Text id='card_recommended_title' className='m-0'>{productProps.name}</Card.Text>
            <Card.Text>€ {productProps.price}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default SingleCardRecommended
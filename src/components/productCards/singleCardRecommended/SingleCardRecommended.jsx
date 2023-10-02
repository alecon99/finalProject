import React from 'react'
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import '../singleCardRecommended/SingleCardRecommended.css';

const SingleCardRecommended = ({ productProps }) => {

  const navigate = useNavigate();

  const navigateToProduct = ()=>{
    navigate(`/detail/${productProps._id}`)
    window.location.reload()
  }

  return (
    <div onClick={navigateToProduct}>
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
    </div>
  )
}

export default SingleCardRecommended
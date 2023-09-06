import React from 'react'
import Card from 'react-bootstrap/Card';
import '../singleCard/SingleCard.css'
import { useNavigate } from 'react-router-dom';

const SingleCard = ({productProps}) => {

  const navigate = useNavigate();

  const detail = ()=>{
    navigate(`/detail/${productProps._id}`);
}
  return (
    <Card className='border-0 my-3' onClick={detail}>
      <div id='container_img'>
        <Card.Img id='card_img' className='rounded-0' src={productProps.image} alt={productProps.name} />
      </div>
      <Card.Body className='p-0'>
        <div className='d-flex justify-content-between'>
          <Card.Text id='card_title'className='m-0'>{productProps.name}</Card.Text>
          <Card.Text>€ {productProps.price}</Card.Text>
        </div>
      </Card.Body>
    </Card> 
  )
}

export default SingleCard
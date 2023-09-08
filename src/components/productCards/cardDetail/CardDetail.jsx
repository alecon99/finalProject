import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../cardDetail/CardDetail.css'

/* reactBootstrap */
import { Col, Container, Row } from 'react-bootstrap'
import AddToCartButton from '../../buttons/addToCartButton/AddToCartButton';

const CardDetail = () => {
    
    const { productId } = useParams()

    const [ productDetail, setProductDetail ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        getProductDetail()
      }, [])

    const getProductDetail = async ()=>{
        try {
            setIsLoading(true)
            const data = await fetch(`http://localhost:5050/product/${productId}`)
            const response = await data.json()
            setProductDetail(response.productById);
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const { name, description, price, category, image } = productDetail
    
  return (
    <div id='card_detail_container'>
      <Container>
        <Row>
          <Col md={6} xl={4} className='text-center text-md-end'>
            <div id='card_container_image'>
              <img id='card_image' src={image} alt="" />
            </div>
            
          </Col>
          <Col md={6} xl={8} className='text-center text-md-start d-flex flex-column justify-content-between'>
            <div>
              <h1>{name}</h1>
              <div className='fs-4 mb-3'>{description}</div>
            </div>
            <div className='d-flex justify-content-between align-items-center mx-4 mx-sm-0'>
              <div className='fs-1'>€ {price}</div>
              <AddToCartButton 
              productId={productId} 
              productName={name}
              productPrice={price}
              productImg={image}
              />
            </div>
            
          </Col>
          
        </Row>
    </Container>
    </div> 
  )
}

export default CardDetail
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import '../cardDetail/CardDetail.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate, faTruck } from '@fortawesome/free-solid-svg-icons'

import { useSession } from '../../../middlewares/ProtectedRoutes'


/* reactBootstrap */
import { Col, Container, Row } from 'react-bootstrap'
import AddToCartButton from '../../buttons/addToCartButton/AddToCartButton';

const CardDetail = () => {

  const { productId } = useParams()

  const session = useSession();

  const [productDetail, setProductDetail] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  console.log(productDetail);

  useEffect(() => {
    getProductDetail()
  }, [])

  const getProductDetail = async () => {
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

  const { name, description, price, category, image, availability } = productDetail

  return (
    <div id='card_detail_container' className='font d-flex align-items-center'>
      <Container>
        <Row>
          <Col md={6} xl={4} className='text-center text-md-end'>
            <div id='card_container_image'>
              <img id='card_image' src={image} alt="" />
            </div>
          </Col>
          <Col md={6} xl={8} className='text-center text-md-start d-flex flex-column justify-content-between'>
            <div>
              <div className='fs-2'>{name}</div>
              <div className='py-2'>| {category} |</div>
              <div className='py-2 border-top text-secondary'>DESCRIPTION</div>
              <div className=' '>{description}</div>
            </div>
            <div className='border-top pt-2'>
              {availability ?
                null
                :
                <div className='text-danger pb-2'>Product currently not available</div>
              }
              <div><FontAwesomeIcon icon={faTruck} /> Free shipping from €50</div>
              <div><FontAwesomeIcon icon={faRotate} /> Easy returns within 60 days</div>
              <div className='d-flex justify-content-between align-items-center mx-4 mx-sm-0'>
                <div className='fs-1'>
                  € {price}
                  <span className='fs-6 ms-2'>TAX incl.</span>
                </div>

                {availability && session ?
                  <AddToCartButton
                    productId={productId}
                    productName={name}
                    productPrice={price}
                    productImg={image}
                  />
                  :
                  null
                }
                {!availability || session ?
                null
                :
                <div className='text-center'>
                  <div>To add to cart</div>
                  <div className='d-flex'>
                  <Link className='hover_link text-decoration-none text-black' to={'/login'} >register</Link>
                    <div className='mx-1'>or</div>
                    <Link className='hover_link text-decoration-none text-black' to={'/login'} >log in</Link>
                  </div>
                </div>
              }
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CardDetail
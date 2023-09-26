import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import '../cardDetail/CardDetail.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRotate } from '@fortawesome/free-solid-svg-icons';

import { useSession } from '../../../middlewares/ProtectedRoutes';

import { Col, Container, Row, Spinner } from 'react-bootstrap';

import AddToCartButton from '../../buttons/addToCartButton/AddToCartButton';
import CardsRecommended from '../cardsRecommended/CardsRecommended';

const CardDetail = () => {

  const { productId } = useParams();

  const session = useSession();

  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProductDetail();
  }, [])

  const getProductDetail = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/product/${productId}`);
      const response = await data.json();
      setProductDetail(response.productById);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const { name, description, price, category, image, availability } = productDetail;

  return (
    <div className='padding_top_100 pb-5 '>
      {isLoading ?
        <div className='text-center mt-5'>
          <Spinner />
          <div>loading...</div>
        </div>
        :
        <Container>
          <Row>
            <Col md={6} xl={4} className='text-center text-md-end'>
              <div id='card_container_image' className='border'>
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
                <div><FontAwesomeIcon icon={faPaperPlane} /> Free shipping from €50</div>
                <div><FontAwesomeIcon icon={faRotate} /> Easy returns within 60 days</div>
                <Row>
                  <Col lg={6} xl={8}>
                    <div className='fs-1'>
                      € {price}
                      <span className='fs-6 ms-2'>TAX incl.</span>
                    </div>
                  </Col>
                  <Col lg={6} xl={4} className='px-5 py-2 px-sm-0'>
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
                      <div className='d-flex justify-content-center fs-5'>
                        <div>To add to cart</div>
                        <div className='d-flex'>
                          <Link className='green text-decoration-none text-black mx-1 fw-bold' to={'/login'} >Register</Link>
                          <div className='mx-1'>or</div>
                          <Link className='green text-decoration-none text-black fw-bold' to={'/login'} >Log in</Link>
                        </div>
                      </div>
                    }
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <div className='mt-5 pt-5 mb-3 border-bottom text-center fs-2'>Recommended products</div>
          <CardsRecommended category={category} />
        </Container>
      }
    </div>
  )
}

export default CardDetail
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSession } from '../../middlewares/ProtectedRoutes';

import { Container, Offcanvas } from 'react-bootstrap';

import ProductCartCard from './productCartCard/ProductCartCard';

import { CartProvider } from '../../context/CartContext';
import { ShippingCostProvider } from '../../context/ShippingCost';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const OffcanvasCart = () => {

  const session = useSession();

  const { cartProducts, cartCounter, totalPrice, show, setShow, getCartProducts } = useContext(CartProvider);
  const { freeShipping } = useContext(ShippingCostProvider);

  const handleClose = () => setShow(false);

  let Total = Math.round(((freeShipping - totalPrice) + Number.EPSILON) * 100) / 100;

  useEffect(() => {
    if (session) {
      getCartProducts(session.id);
    }
  }, [cartCounter])

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Body className='border-start'>
          <div className='mb-3 d-flex justify-content-between align-items-center'>
            <div className='fs-4'>
              Cart
            </div>
            <div onClick={handleClose} className='hover_link text-end fs-4 me-3'><FontAwesomeIcon icon={faArrowRight} /></div>
          </div>
          <div className='border-top'>
            <ProductCartCard />
          </div>
          {cartProducts[0] ?
            <Container className='text-center fs-5 py-2'>
              <div className='d-flex justify-content-between mb-2'>
                <div>Total</div>
                <div >€ {totalPrice}</div>
              </div>
              {totalPrice > freeShipping ?
                <div className='fs-6 bg-green rounded p-1 d-flex align-items-center justify-content-center'>
                  <FontAwesomeIcon icon={faPaperPlane} className='me-2' />
                  <div>Free shipping</div>
                </div>
                :
                <div className='fs-6 bg-green rounded p-1 d-flex align-items-center justify-content-center'>
                  <div>€ {Total} for free shipping</div>
                </div>
              }
              <Link to={'/checkout'} onClick={()=> setShow(false)} className='d-block text-decoration-none bg-dark hover_link text-white rounded p-2 mt-3'>CHECKOUT</Link>
            </Container>
            :
            <div className='text-center py-4 fs-3'>.. add items to cart</div>
          }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default OffcanvasCart
import { useState, useContext, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ProductCartCard from './productCartCard/ProductCartCard';

import { CartProvider } from '../../context/CartContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCartShopping } from '@fortawesome/free-solid-svg-icons'

const OffcanvasCart = () => {

  const { cartProducts, cartCounter, totalPrice, isLoading, getCartProducts } = useContext(CartProvider)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
      getCartProducts()
    },[cartProducts])

  return (
    <>
      <div variant="primary" onClick={handleShow} className='d-flex'>
        <div>Cart</div>
        <div className='ms-2 green'>{cartCounter}</div>
      </div>

      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Body className='bg-black text-white border-start'>
          <div onClick={handleClose} className='hover_link text-end fs-4 me-3'><FontAwesomeIcon icon={faArrowRight} /></div>
          <div className='fs-2 text-center mb-4 green'>
            <FontAwesomeIcon icon={faCartShopping} className='me-3'/>
            ( {cartCounter} art. )
          </div>
          <div>
            <ProductCartCard/>
          </div>
          {cartProducts[0] ? 
            <div className='text-center fs-4 green border-top py-2'>Total € {totalPrice}</div>
            :
            <div className='text-center py-4 fs-3'>.. add items to cart</div>
          }
          
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default OffcanvasCart
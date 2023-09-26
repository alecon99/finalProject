import { useContext } from 'react'

import { CartProvider } from '../../../context/CartContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

import '../cartButton/CartButton.css'

const CartButton = () => {

  const { setShow, cartCounter } = useContext(CartProvider);

  const showCart = () => {
    setShow(true);
  }

  return (
    <>
      {cartCounter > 0 ?
        <div id='cart_button' className='hover_link bg-black text-white border text-center' onClick={showCart}>
          <FontAwesomeIcon icon={faCartShopping} /> {cartCounter}
        </div>
        :
        null
      }
    </>
  )

}

export default CartButton
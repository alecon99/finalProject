import { useContext, useState } from 'react'
import { useSession } from '../../../middlewares/ProtectedRoutes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPlus } from '@fortawesome/free-solid-svg-icons'

import { CartProvider } from '../../../context/CartContext'

const AddToCartButton = ({productId,productName,productPrice,productImg}) => {

    const { cartProducts, cartCounter, isLoading, getCartProducts } = useContext(CartProvider)

    const [ show, setShow ] = useState(false)

    const session = useSession();

    const showTimeout = ()=>{
        setTimeout( showStop, 4000);
    }

    const showStop = ()=>{
        setShow(false)
    }

    const addToCart = async ()=>{
        try {               
            const newProductCart = {
                userId: session.id,
                product: {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    img: productImg
                },
                quantity: 1
            };

        const response = await fetch(`http://localhost:5050/newCart/` + session.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProductCart),
        });
            setShow(true)
            showTimeout()
            getCartProducts()
            return response.json();
        } catch (error) {
            console.error("Failed to save the product");
        }
    }

  return (
    <div className='d-flex align-items-center'>
        <div className={`me-4 bg-black text-white p-2 rounded-3 ${show ? null : 'd-none'}`}>added to cart</div>
        <div className='hover_link fs-3 ' onClick={addToCart}><FontAwesomeIcon icon={faPlus} /><FontAwesomeIcon icon={faCartShopping} /></div>
    </div>
  )
}

export default AddToCartButton
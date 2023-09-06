import React from 'react'
import { useSession } from '../../middlewares/ProtectedRoutes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPlus } from '@fortawesome/free-solid-svg-icons'

const AddToCartButton = ({productId,productName,productPrice,productImg}) => {

    const session = useSession();

    const addToCart = async ()=>{
        try {               
            const newProductCart = {
                userId: session.id,
                product: {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    img: productImg.main
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

            return response.json();
        } catch (error) {
            console.error("Failed to save the product");
        }
    }

  return (
    <div className='hover_link fs-3' onClick={addToCart}><FontAwesomeIcon icon={faPlus} /><FontAwesomeIcon icon={faCartShopping} /></div>
  )
}

export default AddToCartButton
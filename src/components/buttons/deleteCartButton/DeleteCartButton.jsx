import { useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { CartProvider } from '../../../context/CartContext'

import { useSession } from '../../../middlewares/ProtectedRoutes'

const DeleteCartButton = ({ cartId }) => {

    const session = useSession();

    const { getCartProducts } = useContext(CartProvider);

    const deleteCartProduct = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/cart/deleteProduct/${cartId}/${session.id}`, {
                method: "DELETE"
            });
            getCartProducts();
        } catch (error) {
            console.error("Failed to delete the comment");
        }
    };

    return (
        <div className='hover_link_red' onClick={deleteCartProduct}><FontAwesomeIcon icon={faXmark} /></div>
    )
}

export default DeleteCartButton
import { useContext, useState } from 'react';

import { useSession } from '../../../middlewares/ProtectedRoutes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { CartProvider } from '../../../context/CartContext';

import '../addToCartButton/AddToCartButton.css';

const AddToCartButton = ({ productId, productName, productPrice, productImg }) => {

    const { setShow, getCartProducts } = useContext(CartProvider);

    const [productQuantity, setProductQuantity] = useState(1);

    const session = useSession();

    const increaseProductQuantity = () => {
        if (productQuantity < 20) {
            setProductQuantity(productQuantity + 1);
        }
    }

    const decreaseProductQuantity = () => {
        if (productQuantity > 1) {
            setProductQuantity(productQuantity - 1);
        }
    }

    const addToCart = async () => {

        const newProductCart = {
            product: {
                id: productId,
                name: productName,
                price: productPrice,
                img: productImg
            },
            quantity: productQuantity
        };

        try {

            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/newCart/` + session.id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProductCart),
            });
            getCartProducts();
            setShow(true);
            setProductQuantity(1);
            return response.json();
        } catch (error) {
            console.error("Failed to save the product");
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-dark rounded-3 text-white p-2 fs-5'>
            <div className='d-flex align-items-center me-4'>
                <div onClick={increaseProductQuantity} className='hover_link'><FontAwesomeIcon icon={faPlus} /></div>
                <div id='product_quantity' className='mx-2 text-center'>{productQuantity}</div>
                <div onClick={decreaseProductQuantity} className='hover_link'><FontAwesomeIcon icon={faMinus} /></div>
            </div>
            <div className='hover_link' onClick={addToCart}>Add to cart</div>
        </div>
    )
}

export default AddToCartButton
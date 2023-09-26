import { useEffect, useContext } from 'react';

import { CartProvider } from '../../../context/CartContext';

import DeleteCartButton from '../../buttons/deleteCartButton/DeleteCartButton';

const ProductCartCard = () => {

    const { setShow, cartProducts, getCartProducts } = useContext(CartProvider);

    useEffect(() => {
        getCartProducts();
    }, [])

    return (
        <div>
            {cartProducts && cartProducts.map((product) => {

                const detail = () => {
                    setShow(false);
                    window.open(`/detail/${product.product.id}`, "_blank", "noreferrer");
                }

                return (
                    <div className=' d-flex justify-content-between align-items-center border-bottom py-2' key={product._id} >
                        <div className='d-flex'>
                            <div className='d-flex notification_badge_container text-center'>
                                <div className='bg-secondary text-white notification_badge'>{product.quantity}</div>
                                <img className='round_image' src={product.product.img} alt={product.product.name} />
                            </div>
                            <div onClick={detail} className='hover_link ms-3'>
                                <div>{product.product.name}</div>
                                <div className='d-flex justify-content-between'>
                                    <div>€ {product.product.price}</div>
                                </div>
                            </div>
                        </div>
                        <div className='fs-4 px-2'>
                            <DeleteCartButton cartId={product._id} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductCartCard
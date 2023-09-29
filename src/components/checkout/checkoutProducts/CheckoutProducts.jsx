import { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'

import { CartProvider } from '../../../context/CartContext'
import { ShippingCostProvider } from '../../../context/ShippingCost'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faRotate } from '@fortawesome/free-solid-svg-icons'

import '../Checkout.css'

const CheckoutProducts = ({ shippingCost }) => {

    const { totalPrice, cartCounter, cartProducts, getCartProducts } = useContext(CartProvider);
    const { standardShippingCost, priorityShippingCost, freeShipping } = useContext(ShippingCostProvider);

    let Total = Math.round(((totalPrice + shippingCost) + Number.EPSILON) * 100) / 100;

    useEffect(() => {
        getCartProducts();
    }, [totalPrice])

    return (
        <Col md={6} className='border-end bg-light padding_top_100 px-5'>
            {cartCounter > 1 ?
                <h2>Products</h2>
                :
                <h2>Product</h2>
            }
            <div>
                {cartProducts && cartProducts.map((product) => {
                    return (
                        <div key={product._id} className='d-flex justify-content-between align-items-center py-3 px-3'>
                            <div className='d-flex align-items-center'>
                                <div className='text-center notification_badge_container'>
                                    <div className='bg-secondary text-white notification_badge'>{product.quantity}</div>
                                    <img className='round_image' src={product.product.img} alt={product.product.name} />
                                </div>
                                <div className='mx-3 ' >{product.product.name}</div>
                            </div>
                            <div>
                                <div className='text-nowrap'>{product.product.price} €</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='border-bottom py-3 fs-5'>
                <div className='d-flex justify-content-between'>
                    <div>Subtotal</div>
                    <div>{totalPrice} €</div>
                </div>
                <div className='d-flex justify-content-between'>
                    <div>Shipping</div>
                    {shippingCost === 0 ?
                        <div className='fw-bold'>(Standard) Free</div>
                        :
                        null
                    }
                    {shippingCost === standardShippingCost ?
                        <div className='fw-bold'>(Standard) {standardShippingCost} €</div>
                        :
                        null
                    }
                    {shippingCost === priorityShippingCost ?
                        <div className='fw-bold'>(Priority) {priorityShippingCost} €</div>
                        :
                        null
                    }
                </div>
            </div>
            <div className='fs-5'>
                <div className='d-flex justify-content-between py-3'>
                    <div>Total</div>
                    {totalPrice > freeShipping && shippingCost === standardShippingCost ?
                        <div>{totalPrice} €</div>
                        :
                        <div>{Total} €</div>
                    }
                </div>
            </div>
            <Row className='bg-white border rounded mx-md-5 my-4 p-3 text-center'>
                <Col className='packages_info p-1'>
                    <FontAwesomeIcon icon={faRotate} className='fs-1 mb-2' />
                    <div className='fw-bold'>Free return</div>
                    <div className='text-secondary font_size_xs'>Don't like the product? Make a return easily and free of charge.</div>
                </Col>
                <Col className='packages-info p-1'>
                    <FontAwesomeIcon icon={faBoxOpen} className='fs-1 mb-2' />
                    <div className='fw-bold'>Eco-friendly</div>
                    <div className='text-secondary font_size_xs'>The packaging comes from recycled materials.</div>
                </Col>
            </Row>
        </Col>
    )
}

export default CheckoutProducts
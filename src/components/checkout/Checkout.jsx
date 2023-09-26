import { useContext, useEffect, useState } from 'react'

import { Col, Row } from 'react-bootstrap'
import { CartProvider } from '../../context/CartContext'

import { ShippingCostProvider } from '../../context/ShippingCost'
import { UsersProvider } from '../../context/UserContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons'

import CheckoutProducts from './checkoutProducts/CheckoutProducts'
import CheckoutInfo from './checkoutInfo/CheckoutInfo'
import CheckoutShipping from './checkoutShipping/CheckoutShipping'
import CheckoutPay from './checkoutPay/CheckoutPay'

import '../checkout/Checkout.css'

const Checkout = () => {

    const { totalPrice, getCartProducts } = useContext(CartProvider);
    const { standardShippingCost, freeShipping } = useContext(ShippingCostProvider);

    const { getUserById } = useContext(UsersProvider);

    const [checkoutPage, setCheckoutPage] = useState("info");
    const [shippingCost, setShippingCost] = useState(null);

    const isShippingFree = () => {
        if (totalPrice < freeShipping) {
            setShippingCost(standardShippingCost);
        } else {
            setShippingCost(0);
        }
    }

    useEffect(() => {
        isShippingFree();
        getCartProducts();
        getUserById();
    }, [])

    return (
        <Row id='checkout_container'>
            <CheckoutProducts
                shippingCost={shippingCost}
            />
            <Col md={6} className='padding_top_100 px-5 pb-4'>
                <div className='d-flex justify-content-around mb-4'>
                    <div className='text-center'>
                        <FontAwesomeIcon icon={faCircleCheck} className='fs-3' />
                        <div className='info_checkout'>Cart</div>
                    </div>
                    <div className='text-center'>
                        {checkoutPage === 'info' ?
                            <FontAwesomeIcon icon={faCircleDot} beat className='fs-3' />
                            :
                            null
                        }
                        {checkoutPage === 'shipping' || checkoutPage === 'pay' ?
                            <FontAwesomeIcon icon={faCircleCheck} className='fs-3' />
                            :
                            null
                        }
                        <div className='info_checkout'>Info</div>
                    </div>
                    <div className='text-center'>
                        {checkoutPage === 'info' ?
                            <FontAwesomeIcon icon={faCircle} className='fs-3' />
                            :
                            null
                        }
                        {checkoutPage === 'shipping' ?
                            <FontAwesomeIcon icon={faCircleDot} beat className='fs-3' />
                            :
                            null
                        }
                        {checkoutPage === 'pay' ?
                            <FontAwesomeIcon icon={faCircleCheck} className='fs-3' />
                            :
                            null
                        }
                        <div className='info_checkout'>Shipping</div>
                    </div>
                    <div className='text-center'>
                        {checkoutPage === 'pay' ?
                            <FontAwesomeIcon icon={faCircleDot} beat className='fs-3' />
                            :
                            null
                        }
                        {checkoutPage === 'shipping' || checkoutPage === 'info' ?
                            <FontAwesomeIcon icon={faCircle} className='fs-3' />
                            :
                            null
                        }
                        <div className='info_checkout'>Pay</div>
                    </div>
                </div>
                <div>
                    <CheckoutInfo
                        checkoutPage={checkoutPage}
                        setCheckoutPage={setCheckoutPage}
                    />
                    <CheckoutShipping
                        checkoutPage={checkoutPage}
                        setCheckoutPage={setCheckoutPage}
                        shippingCost={shippingCost}
                        setShippingCost={setShippingCost}
                    />
                    <CheckoutPay
                        checkoutPage={checkoutPage}
                        setCheckoutPage={setCheckoutPage}
                        shippingCost={shippingCost}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default Checkout
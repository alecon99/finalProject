import { useContext, useState, useEffect } from 'react'
import { UsersProvider } from '../../../context/UserContext'
import { CartProvider } from '../../../context/CartContext'
import { ShippingCostProvider } from '../../../context/ShippingCost'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons'

import { Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../../middlewares/ProtectedRoutes'

const CheckoutPay = ({ checkoutPage, setCheckoutPage, shippingCost }) => {

    const { user } = useContext(UsersProvider)
    const { cartProducts, totalPrice } = useContext(CartProvider)
    const { standardShippingCost, priorityShippingCost, freeShipping } = useContext(ShippingCostProvider)

    const [ totalPaid , setTotalPaid ] = useState(null)

    const navigate = useNavigate()
    const session = useSession()

    let Total = Math.round(((totalPrice + shippingCost) + Number.EPSILON) * 100) / 100;

    const totalCalculation = ()=>{
        if(totalPrice > freeShipping && shippingCost === standardShippingCost){
            setTotalPaid(totalPrice)
        } else {
            setTotalPaid(Total)
        }
    }

    useEffect(() => {
        totalCalculation()
    }, [totalPrice,shippingCost])

    const returnToShipping = () => {
        setCheckoutPage("shipping")
    }

    const pay = async () => {

        const payload = {
            cart: cartProducts,
            state: "processing",
            shippingAddress: user.shippingAddress,
            paid: {
                total: totalPaid,
                products: totalPrice,
                shipping: shippingCost
            }
        }

        try {
            const response = await fetch(`http://localhost:5050/newOrder/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            deleteAllCart()
            navigate('/orderCompleted')
        } catch (error) {
            console.error("Failed to save the post");
        }
    }

    const deleteAllCart = async () => {
        try {   
            const response = await fetch(`http://localhost:5050/cart/deleteAllProduct/${session.id}`, {
                method: "PUT"
            });
        } catch (error) {
            console.error("Failed to delete the comment");
        }

    };

    return (
        <div className={`${checkoutPage === 'pay' ? null : 'd-none'}`}>
            <div className='border rounded p-2 mb-4'>
                <h3>Contacts</h3>
                <div>{user.name} {user.surname}</div>
                <div className='d-flex'>
                    <div className='me-2'>Email:</div>
                    <div className='ellipsis'>{user.email}</div>
                </div>
                {user.phone ?
                    <div className='d-flex'>
                        <div className='me-2'>Phone:</div>
                        <div>+{user.phone.prefix}</div>
                        <div className='ms-1'>{user.phone.number}</div>
                    </div>
                    :
                    null
                }
            </div>
            <div className='border rounded p-2 mb-4'>
                <h3>Shipping address</h3>
                {user.shippingAddress ?
                    <div className='d-flex'>
                        <div className='ellipsis'>{user.shippingAddress.address},</div>
                        <div className='mx-1'>{user.shippingAddress.zipCode},</div>
                        <div>{user.shippingAddress.country},</div>
                        <div className='mx-1'>{user.shippingAddress.state}</div>
                    </div>
                    :
                    null
                }
            </div>
            <div className='border rounded p-2 mb-4'>
                <h3>Shipping methods</h3>
                {shippingCost === 0 ?
                    <div>Standard (4-5 working days)<span className='fw-bold ms-2'>Free</span></div>
                    :
                    null
                }
                {shippingCost === standardShippingCost ?
                    <div>Standard (4-5 working days)<span className='fw-bold ms-2'>{standardShippingCost} €</span></div>
                    :
                    null
                }
                {shippingCost === priorityShippingCost ?
                    <div>Priority (2-3 working days)<span className='fw-bold ms-2'>{priorityShippingCost} €</span></div>
                    :
                    null
                }
            </div>
            <div className='border rounded p-2 mb-4'>
                <h3>Payment</h3>
                <div className='fs-3 mb-2'>
                    <FontAwesomeIcon icon={faCcVisa} className='me-2' />
                    <FontAwesomeIcon icon={faCcMastercard} className='me-2 text-warning'/>
                    <FontAwesomeIcon icon={faCcAmex} className='text-primary'/>
                </div>
                <Form>
                    <Row>
                        <Col sm={12}>
                            <Form.Group className="mb-3" controlId="formBasicCardholder name">
                                <div>Cardholder name</div>
                                <Form.Control type="text" placeholder='Name Surname'
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={8}>
                            <Form.Group className="mb-3" controlId="formBasicCardNumber">
                                <div>Card number</div>
                                <Form.Control type="number" placeholder='1111-2222-3333-4444' min={1111111111111111} max={9999999999999999}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group className="mb-3" controlId="formBasicCVV">
                                <div>CVV</div>
                                <Form.Control type="number" placeholder='123' min={111} max={999}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-3" controlId="formBasicCardExpMonth">
                                <div>Exp month</div>
                                <Form.Control type="number" placeholder='mm' min={1} max={12}
                                />
                            </Form.Group>

                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mb-3" controlId="formBasicCardExpYear">
                                <div>Exp year</div>
                                <Form.Control type="number" placeholder='yyyy' max={2030} min={2023}
                                />
                            </Form.Group>

                        </Col>
                    </Row>
                </Form>

            </div>
            <div className='d-flex justify-content-between align-items-center mt-4'>
                <div onClick={returnToShipping} className='hover_link d-flex align-items-center'>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <div className='ms-2'>Return to shipping</div>
                </div>
                <div onClick={pay} className='bg-dark hover_link text-white text-center rounded p-2 px-sm-4'>Pay</div>
            </div>
        </div>
    )
}

export default CheckoutPay
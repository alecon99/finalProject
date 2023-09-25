import { useState, useEffect, useContext } from 'react'
import { Spinner, Container, Button } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faBagShopping, faCircleCheck, faGears, faTruck, faChevronUp, faChevronDown, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { ShippingCostProvider } from '../../../context/ShippingCost'


const ManageOrder = () => {

    const [allOrders, setAllOrders] = useState([])
    const [allOrdersCounter, setAllOrdersCounter] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [orderState, setOrderState] = useState(null)
    const [showCart, setShowCart] = useState(null)

    const { standardShippingCost } = useContext(ShippingCostProvider)

    const getAllOrders = async () => {
        try {
            setIsLoading(true)
            const data = await fetch(`http://localhost:5050/orders`)
            const response = await data.json()
            setAllOrders(response.orders)
            setAllOrdersCounter(response.counter)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const modOrder = async () => {

        const payload = {
            state: orderState.state
        }

        try {
            const response = await fetch(`http://localhost:5050/modOrder/${orderState.orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            getAllOrders()
            setOrderState(null)
        } catch (error) {
            console.error("Failed to save the post");
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    return (
        <Container className='padding_top_100 pb-5' >
            {isLoading ?
                <div className='mt-5 text-center'>
                    <div>Loading ...</div>
                    <Spinner animation="grow" />
                </div>
                :
                <div >
                    <div className='d-flex  align-items-center justify-content-between'>
                        <h3 className='bg-black text-white p-2 rounded-2'>Total orders: {allOrdersCounter}</h3>
                    </div>
                    {allOrders && allOrders.map((order) => {
                        return (
                            <div key={order._id} className='my-3 p-3 border rounded'>
                                {orderState && orderState.orderId === order._id ?
                                    <div className='d-flex border rounded p-1 justify-content-around mb-3'>
                                        <div className='fw-bolder hover_link' onClick={modOrder}>Save</div>
                                        <div className='fw-bolder hover_link_red' onClick={()=> setOrderState(null)}>Cancel</div>
                                    </div>
                                    :
                                    null
                                }
                                <div className='d-flex justify-content-around border-bottom py-2'>
                                    <div className='text-center'>
                                        {order.state === 'canceled' ?
                                            <FontAwesomeIcon icon={faCircleXmark} className='fs-3 text-danger' />
                                            :
                                            <FontAwesomeIcon icon={faCircleXmark} className='fs-3 hover_link_red' onClick={() => setOrderState({ orderId: order._id, state: "canceled" })} />
                                        }
                                        <div className='info_checkout font_size_xs'>Canceled</div>
                                    </div>
                                    <div className='text-center'>
                                        {order.state === 'confirmed' || order.state === 'shipped' || order.state === 'completed' ?
                                            <FontAwesomeIcon icon={faBoxOpen} className='fs-3 green' />
                                            :
                                            <FontAwesomeIcon icon={faBoxOpen} className='fs-3 hover_link' onClick={() => setOrderState({ orderId: order._id, state: "confirmed" })} />
                                        }
                                        <div className='info_checkout font_size_xs'>Confirmed</div>
                                    </div>
                                    <div className='text-center'>
                                        {order.state === 'shipped' || order.state === 'completed' ?
                                            <FontAwesomeIcon icon={faTruck} className='fs-3 green' />
                                            :
                                            <FontAwesomeIcon icon={faTruck} className='fs-3 hover_link' onClick={() => setOrderState({ orderId: order._id, state: "shipped" })} />
                                        }
                                        <div className='info_checkout font_size_xs'>Shipped</div>
                                    </div>
                                    <div className='text-center'>
                                        {order.state === 'completed' ?
                                            <FontAwesomeIcon icon={faCircleCheck} className='fs-3 green' />
                                            :
                                            <FontAwesomeIcon icon={faCircleCheck} className='fs-3 hover_link' onClick={() => setOrderState({ orderId: order._id, state: "completed" })} />
                                        }
                                        <div className='info_checkout font_size_xs'>Completed</div>
                                    </div>
                                </div>
                                <div className='border-bottom py-2'>
                                    <h4>User</h4>
                                    <div>#{order.userId}</div>
                                </div>
                                <div className='border-bottom py-2'>
                                    <h4>Amount</h4>
                                    <div>
                                        <div>Products: {order.paid.products} €</div>
                                        <div>Shipping:
                                            {order.paid.shipping === 0 || order.paid.shipping === standardShippingCost ?
                                                <span className='mx-1'>(Standard)</span>
                                                :
                                                <span className='mx-1 fw-bold'>(Priority)</span>
                                            }

                                            {order.paid.shipping} €</div>
                                        <div>Total: {order.paid.total} €</div>
                                    </div>
                                </div>
                                <div className='border-bottom py-2'>
                                    <h4>Address</h4>
                                    <div className='d-flex'>
                                        <div className='ellipsis'>{order.shippingAddress.address},</div>
                                        <div className='ms-1 ellipsis'>{order.shippingAddress.city},</div>
                                        <div className='ms-1'>{order.shippingAddress.zipCode},</div>
                                        <div className='ms-1 d-none d-sm-block'>{order.shippingAddress.country},</div>
                                        <div className='ms-1 d-none d-sm-block'>{order.shippingAddress.state}</div>
                                    </div>
                                </div>
                                <div className='py-2 border-bottom'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h4>Cart</h4>
                                        {showCart === order._id ?
                                            <div className='d-flex align-items-center hover_link' onClick={() => setShowCart(null)}>
                                                <div className='me-2 '>show</div>
                                                <FontAwesomeIcon icon={faChevronUp} />
                                            </div>
                                            :
                                            <div className='d-flex align-items-center hover_link' onClick={() => setShowCart(order._id)}>
                                                <div className='me-2 '>show</div>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                            </div>
                                        }
                                    </div>
                                    {showCart === order._id ?
                                        <div>
                                            {order.cart && order.cart.map((cart) => {

                                                const detail = () => {
                                                    window.open(`/detail/${cart.product.id}`, "_blank", "noreferrer");
                                                }
                                                return (
                                                    <div key={cart._id} className='d-flex justify-content-between align-items-center py-2 hover_link' onClick={detail}>
                                                        <div className='d-flex align-items-center'>
                                                            <div className='text-center notification_badge_container'>
                                                                <div className='bg-secondary text-white notification_badge'>{cart.quantity}</div>
                                                                <img className='round_image' src={cart.product.img} alt={cart.product.name} />
                                                            </div>
                                                            <div className='mx-3' >{cart.product.name}</div>
                                                        </div>
                                                        <div>
                                                            <div className='text-nowrap me-2'>{cart.product.price} €</div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                <div className='py-2 fw-bold'>#{order._id}</div>
                            </div>
                        )
                    })}
                </div>
            }
        </Container >
    )
}

export default ManageOrder
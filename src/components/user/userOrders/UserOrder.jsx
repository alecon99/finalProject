import { useEffect, useState, useContext } from 'react';

import { Button, Container } from 'react-bootstrap';

import { useSession } from '../../../middlewares/ProtectedRoutes';

import { ShippingCostProvider } from '../../../context/ShippingCost';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faBagShopping, faCircleCheck, faGears, faTruck, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const UserOrder = () => {

    const { standardShippingCost } = useContext(ShippingCostProvider);

    const [orders, setOrders] = useState([]);
    const [showCart, setShowCart] = useState(null);
    const [showCancelOrder, setShowCancelOrder] = useState(null);
    const [showReturn, setShowReturn] = useState(null);

    const session = useSession();

    useEffect(() => {
        getOrder();
    }, [])

    const getOrder = async () => {
        try {
            const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/user/order/${session.id}`);
            const response = await data.json();
            setOrders(response.order);
        } catch (error) {
            console.log(error);
        }
    }

    const modOrder = async (order) => {

        const payload = {
            state: "canceled"
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/modOrder/${order}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            getOrder();
            setShowCancelOrder(null);
        } catch (error) {
            console.error("Failed to save the post");
        }
    }

    return (
        <Container className='padding_top_100 pb-5'>
            {orders[0] ?
                null
                :
                <div className='text-center'>
                    <div className='fs-1 green'>There are no orders</div>
                    <div className='fs-4'>make your first purchase on our site</div>
                    <FontAwesomeIcon icon={faBagShopping} bounce className='fs-1 mt-5 green' />
                </div>
            }
            {orders && orders.map((order) => {
                return (
                    <div className='my-3 mx-1 p-2 border rounded' key={order._id} >
                        {order.state === 'canceled' ?
                            <h4 className='text-danger border-bottom p-2'>Order cancelled</h4>
                            :
                            <div className='d-flex justify-content-around border-bottom py-2'>
                                <div className='text-center'>
                                    {order.state === 'processing' ?
                                        <FontAwesomeIcon icon={faGears} className='fs-3 text-warning' />
                                        :
                                        <FontAwesomeIcon icon={faGears} className='fs-3 green' />
                                    }
                                    <div className='info_checkout font_size_xs'>Processing</div>
                                </div>
                                <div className='text-center'>
                                    {order.state === 'confirmed' || order.state === 'shipped' || order.state === 'completed' ?
                                        <FontAwesomeIcon icon={faBoxOpen} className='fs-3 green' />
                                        :
                                        <FontAwesomeIcon icon={faBoxOpen} className='fs-3' />
                                    }
                                    <div className='info_checkout font_size_xs'>Confirmed</div>
                                </div>
                                <div className='text-center'>
                                    {order.state === 'shipped' || order.state === 'completed' ?
                                        <FontAwesomeIcon icon={faTruck} className='fs-3 green' />
                                        :
                                        <FontAwesomeIcon icon={faTruck} className='fs-3' />
                                    }
                                    <div className='info_checkout font_size_xs'>Shipped</div>
                                </div>
                                <div className='text-center'>
                                    {order.state === 'completed' ?
                                        <FontAwesomeIcon icon={faCircleCheck} className='fs-3 green' />
                                        :
                                        <FontAwesomeIcon icon={faCircleCheck} className='fs-3' />
                                    }
                                    <div className='info_checkout font_size_xs'>Completed</div>
                                </div>
                            </div>
                        }
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
                        <div>
                            {order.state === 'processing' ?
                                <div className='py-2 fw-bold text-danger hover_link_red ' onClick={() => setShowCancelOrder(order._id)}>Cancel order #{order._id}</div>
                                :
                                null
                            }
                            {showCancelOrder === order._id ?
                                <div className='border bg-light rounded p-2 d-flex justify-content-around align-items-center'>
                                    <div>Do you want to proceed?</div>
                                    <Button variant='danger' className='fw-bold border rounded p-2' onClick={() => modOrder(order._id)}>Yes</Button>
                                    <Button variant='success' className='fw-bold border rounded p-2' onClick={() => setShowCancelOrder(null)}>No</Button>
                                </div>
                                :
                                null
                            }
                            {order.state === 'completed' ?
                                <div className='py-2 fw-bold text-danger hover_link_red' onClick={() => setShowReturn(order._id)}>Return order #{order._id}</div>
                                :
                                null
                            }
                            {order.state !== 'completed' && order.state !== 'processing' ?
                                <div className='py-2 fw-bold'>#{order._id}</div>
                                :
                                null
                            }
                            {showReturn === order._id ?
                                <div className='border bg-light rounded p-2 d-flex justify-content-around align-items-center'>
                                    <div>Do you want to proceed?</div>
                                    <Button variant='danger' className='fw-bold border rounded p-2' >Yes</Button>
                                    <Button variant='success' className='fw-bold border rounded p-2' onClick={() => setShowReturn(null)}>No</Button>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                )
            })}
        </Container>
    )
}

export default UserOrder
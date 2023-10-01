import { useContext } from 'react'

import { UsersProvider } from '../../../context/UserContext'
import { ShippingCostProvider } from '../../../context/ShippingCost'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faCircle, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { CartProvider } from '../../../context/CartContext'


const CheckoutShipping = ({ checkoutPage, shippingCost, setShippingCost, setCheckoutPage }) => {

    const { user } = useContext(UsersProvider);
    const { totalPrice } = useContext(CartProvider);
    const { standardShippingCost, priorityShippingCost, freeShipping } = useContext(ShippingCostProvider);
    
    const itIsFree = () => {
        if (totalPrice < freeShipping) {
            setShippingCost(standardShippingCost);
        } else {
            setShippingCost(0);
        }
    }

    const returnToInfo = () => {
        setCheckoutPage("info");
    }

    const goToPay = () => {
        setCheckoutPage("pay");
    }

    return (
        <div className={`${checkoutPage === 'shipping' ? null : 'd-none'}`}>
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
                        <div className='mx-1 ellipsis'>{user.shippingAddress.city},</div>
                        <div className='mx-1 d-none d-sm-block'>{user.shippingAddress.zipCode},</div>
                        <div>{user.shippingAddress.country},</div>
                        <div className='mx-1 d-none d-sm-block'>{user.shippingAddress.state}</div>
                    </div>
                    :
                    null
                }
            </div>
            <div className='border rounded p-2 mb-4'>
                <h3>Shipping methods</h3>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center' onClick={() => itIsFree()}>
                        {shippingCost === standardShippingCost || shippingCost === 0 ?
                            <FontAwesomeIcon icon={faCircleDot} />
                            :
                            <FontAwesomeIcon icon={faCircle} className='hover_link' />
                        }
                        <div className='ms-2'>Standard (4-5 working days)</div>
                    </div>
                    {totalPrice > freeShipping ?
                        <div className='fw-bold'>Free</div>
                        :
                        <div>{standardShippingCost} €</div>
                    }
                </div>
                <div className='d-flex align-items-center justify-content-between '>
                    <div className='d-flex align-items-center' onClick={() => setShippingCost(priorityShippingCost)} >
                        {shippingCost === priorityShippingCost ?
                            <FontAwesomeIcon icon={faCircleDot} />
                            :
                            <FontAwesomeIcon icon={faCircle} className='hover_link' />
                        }
                        <div className='ms-2'>Priority (2-3 working days)</div>
                    </div>
                    <div>{priorityShippingCost} €</div>
                </div>
            </div>
            <div className='d-flex justify-content-between align-items-center mt-4'>
                <div onClick={returnToInfo} className='hover_link d-flex align-items-center'>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <div className='ms-2'>Return to info</div>
                </div>
                <div onClick={goToPay} className='bg-dark hover_link text-white text-center rounded p-2 px-sm-4'>Go to payment</div>
            </div>
        </div>
    )
}

export default CheckoutShipping
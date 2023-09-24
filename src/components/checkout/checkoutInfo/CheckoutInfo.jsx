import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UsersProvider } from '../../../context/UserContext'
import { CartProvider } from '../../../context/CartContext'

import AddUserAddress from '../../user/userData/addUserAddress/AddUserAddress'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPen, faPlus, faX } from '@fortawesome/free-solid-svg-icons'

const CheckoutInfo = ({ checkoutPage, setCheckoutPage }) => {

    const { setShow } = useContext(CartProvider)
    const { user } = useContext(UsersProvider)

    const [ showModAddress, setShowModAddress ] = useState(false)

    const navigate = useNavigate()

    const returnToCart = () => {
        setShow(true)
        navigate('/')
    }

    const goToShipping = () => {
        if(user.shippingAddress){
            setCheckoutPage("shipping")
            setShowModAddress(false)
        }
    }

    return (
        <div className={`${checkoutPage === 'info' ? null : 'd-none'}`}>
            <div className='border rounded p-2 mb-4'>
                <h3>Contacts</h3>
                <div>{user.name} {user.surname}</div>
                <div className='d-flex'>
                    <div className='me-2 '>Email:</div>
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
                <div className='d-flex justify-content-between align-items-center'>
                    <h3>Shipping address</h3>
                    {user.shippingAddress && !showModAddress?
                        <FontAwesomeIcon icon={faPen} className='me-2 mb-1 hover_link' onClick={ ()=> setShowModAddress(true)}/>
                        :
                        null
                    }
                    {user.shippingAddress && showModAddress ?
                        <FontAwesomeIcon icon={faX} className='me-2 mb-1 hover_link' onClick={ ()=> setShowModAddress(false)}/>
                        :
                        null
                    }
                    {!user.shippingAddress ?
                        <FontAwesomeIcon icon={faPlus} className='me-2 mb-1 hover_link' onClick={ ()=> setShowModAddress(true)}/>
                        :
                        null
                    }
                </div>
                {user.shippingAddress ?
                    <div className='d-flex'>
                        <div className='ellipsis'>{user.shippingAddress.address},</div>
                        <div className='mx-1'>{user.shippingAddress.city},</div>
                        <div className='mx-1'>{user.shippingAddress.zipCode},</div>
                        <div>{user.shippingAddress.country},</div>
                        <div className='mx-1'>{user.shippingAddress.state}</div>
                    </div>
                    :
                    null
                }
                <div className={`mt-3 pt-3 border-top ${showModAddress ? null:'d-none'}`}>
                    <AddUserAddress setShow={setShowModAddress}/>
                </div>
            </div>
            <div className='d-flex justify-content-between align-items-center mt-4'>
                <div onClick={returnToCart} className='hover_link d-flex align-items-center'>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <div className='ms-2'>Return to cart</div>
                </div>
                <div onClick={goToShipping} className='bg-dark hover_link text-white text-center rounded p-2 px-sm-4'>Go to shipping</div>
            </div>
        </div>
    )
}

export default CheckoutInfo
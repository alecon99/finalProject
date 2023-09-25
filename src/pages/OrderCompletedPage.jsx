import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'

import Spinner from 'react-bootstrap/Spinner';

const OrderCompletedPage = () => {

  const navigate = useNavigate();

  const Timeout = () => {
    setTimeout(redirect, 4000);
  }

  const redirect = () => {
    navigate(`/`);
  }

  useEffect(() => {
    Timeout();
  }, [])

  return (
    <div className='mt-5 text-center'>
      <div className='fs-2'>Thank you for purchasing from us</div>
      <div className='mt-5 fs-1 green'>
        <FontAwesomeIcon icon={faBagShopping} bounce />
      </div>
      <div className='mt-5'>
        <div>you will be redirected to the home page</div>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  )
}

export default OrderCompletedPage
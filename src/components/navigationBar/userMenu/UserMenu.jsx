import React from 'react';
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import OffcanvasCart from '../../offcanvasCart/OffcanvasCart';

const UserMenu = ({setUserMenuShow}) => {

    const navigate = useNavigate();

    const disconnect = () => {
        setUserMenuShow(false)
        navigate('/disconnect');
    }

  return (
    <Container className='my-2 border-top'>
        <div className='text-white mt-3 d-flex justify-content-center'>
            <div className='mx-2 hover_link_red' onClick={disconnect}>
                | Disconnect |
            </div>
            <div className='mx-2 hover_link'>
                | MyData |
            </div>
            <div className='mx-2 hover_link'>
                <div className='d-flex'>
                    <div className='me-1'>|</div>
                    <OffcanvasCart/>
                    <div className='ms-1'>|</div>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default UserMenu
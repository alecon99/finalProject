import React from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const UserMenu = ({setUserMenuShow}) => {

    const navigate = useNavigate();

    const disconnect = () => {
        localStorage.clear()
        setUserMenuShow(false)
        navigate('/');
    }

  return (
    <Container className='my-2 border-top'>
        <div className='text-white mt-3 d-flex justify-content-center'>
            <div className='mx-2 hover_link' onClick={disconnect}>
                | Disconnect |
            </div>
            <div className='mx-2 hover_link'>
                | MyData |
            </div>
            <div className='mx-2 hover_link'>
                | Cart |
            </div>
        </div>
    </Container>
  )
}

export default UserMenu
import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';

import { CartProvider } from '../context/CartContext';
import { AdminProvider } from '../context/AdminContext';

const DisconnectPage = () => {

    const navigate = useNavigate();

    const { setCartProducts } = useContext(CartProvider);
    const { setAdminRole } = useContext(AdminProvider);

    const Timeout = () => {
        setTimeout(redirect, 3000);
        localStorage.clear();
        setAdminRole(false);
        setCartProducts([]);
    }

    const redirect = () => {
        navigate(`/`);
    }

    useEffect(() => {
        Timeout();
    }, [])

    return (
        <div className='mt-5 text-center'>
            <div className='fs-2'>Bye, see you soon</div>
            <div className='mt-5'>
                <div>you will be redirected to the home page</div>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </div>
    )
}

export default DisconnectPage
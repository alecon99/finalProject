import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import { CartProvider } from '../../../context/CartContext';
import { AdminProvider } from '../../../context/AdminContext';

const UserMenu = ({ setUserMenuShow }) => {

    const { setShow, cartCounter } = useContext(CartProvider);
    const { adminRole } = useContext(AdminProvider);

    const navigate = useNavigate();

    const handleShow = () => {
        setUserMenuShow(false);
        setShow(true);
    }

    const disconnect = () => {
        setUserMenuShow(false);
        navigate('/disconnect');
    }

    return (
        <Container className='my-2 border-top'>
            <div className='d-flex justify-content-evenly flex-wrap text-white pt-3'>
                <div className='mx-2 hover_link_red text-nowrap' onClick={disconnect}>
                    | Disconnect |
                </div>
                <Link className='mx-2 hover_link text-decoration-none text-white text-nowrap' to={'/userData'}>
                    | MyData |
                </Link>
                <Link className='mx-2 hover_link text-decoration-none text-white text-nowrap' to={'/userOrders'}>
                    | MyOrders |
                </Link>
                <div onClick={handleShow} className='mx-2 hover_link text-nowrap'>
                    | Cart <span className='green'>{cartCounter}</span> |
                </div>
            </div>
            <div className={`pt-3 ${adminRole ? null : 'd-none'}`}>
                <div className='border-top text-center text-white fs-5 pt-3'>Management</div>
                <div className='text-white my-3 d-flex justify-content-center'>
                    <Link className='mx-2 hover_link text-decoration-none text-white' to={'/manageProducts'}>
                        | Products |
                    </Link>
                    <Link className='mx-2 hover_link text-decoration-none text-white' to={'/manageUsers'}>
                        | Users |
                    </Link>
                    <Link className='mx-2 hover_link text-decoration-none text-white' to={'/manageOrders'} >
                        | Orders |
                    </Link>
                </div>
            </div>
        </Container>
    )
}

export default UserMenu
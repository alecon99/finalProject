import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { useSession } from '../middlewares/ProtectedRoutes'

import { Spinner } from 'react-bootstrap';

import { AdminProvider } from '../context/AdminContext';

const SuccessLogin = () => {

    const { setAdminRole } = useContext(AdminProvider);

    const session = useSession();
    const navigate = useNavigate();

    const Timeout = () => {
        setTimeout(redirect, 3000);
        isAdmin();
    }

    const redirect = () => {
        navigate(`/`);
    }

    const isAdmin = () => {
        if (session) {
            if (session.role === "admin") {
                setAdminRole(true);
            }
        } else {
            setAdminRole(false);
        }
    }

    useEffect(() => {
        Timeout();
    }, [])

    return (
        <div className='mt-5 text-center'>
            <div className='fs-2'>Logged in successfully !</div>
            <div className='mt-5 fs-1'>
                <div>Welcome</div>
                <div className='green font'>{session.name} {session.surname}</div>
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

export default SuccessLogin
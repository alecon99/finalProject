import { useEffect, useContext, useState } from 'react';

import { Container, Modal } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';

import { UsersProvider } from '../../../context/UserContext';

import AddUserAddress from './addUserAddress/AddUserAddress';
import ModLoginData from './modLoginData/ModLoginData';
import ModPersonalData from './modPersonalData/ModPersonalData';

const UserData = () => {

    const { getUserById, user } = useContext(UsersProvider);

    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showPersonalModal, setShowPersonalModal] = useState(false);

    const handleClose = () => {
        setShowAddressModal(false);
        setShowLoginModal(false);
        setShowPersonalModal(false);
    }

    useEffect(() => {
        getUserById();
    }, [])

    return (
        <Container className='padding_top_100 pb-5'>
            <div className='border-bottom my-2 p-2'>
                <div className='d-flex align-items-center'>
                    <h1>Personal data</h1>
                    <Modal
                        show={showPersonalModal}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title className='mb-2'>Personal data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ModPersonalData setShow={setShowPersonalModal} />
                        </Modal.Body>
                    </Modal>
                    <FontAwesomeIcon className='ms-4 fs-5 hover_link' icon={faPencil} onClick={() => setShowPersonalModal(true)} />
                </div>
                <div>
                    <div>Name: {user.name}</div>
                    <div>Surname: {user.surname}</div>
                    {user.phone ?
                        <div>Phone number: +{user.phone.prefix} {user.phone.number}</div>
                        :
                        <div>Phone number: ...</div>
                    }
                    {user.role === "admin" ?
                        <div>Role: <span className='text-danger'>{user.role}</span></div>
                        :
                        null
                    }
                </div>
            </div>
            <div className='border-bottom my-2 p-2'>
                <div className='d-flex align-items-center '>
                    <h1>Login user</h1>
                    <Modal
                        show={showLoginModal}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title className='mb-2'>Login user</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ModLoginData setShow={setShowLoginModal} />
                        </Modal.Body>
                    </Modal>
                    <FontAwesomeIcon className='ms-4 fs-5 hover_link' icon={faPencil} onClick={() => setShowLoginModal(true)} />
                </div>
                <div>
                    <div>Email: {user.email}</div>
                    <div>Password: **************</div>
                </div>
            </div>
            <div className='border-bottom my-2 p-2'>
                <div className='d-flex align-items-center'>
                    <h1>Shipping address</h1>
                    <Modal
                        show={showAddressModal}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title className='mb-2'>Shipping address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddUserAddress setShow={setShowAddressModal} />
                        </Modal.Body>
                    </Modal>
                    {user.shippingAddress ?
                        <div onClick={() => setShowAddressModal(true)} className='m-3 hover_link'>
                            <FontAwesomeIcon className='fs-5' icon={faPencil} />
                        </div>
                        :
                        <div onClick={() => setShowAddressModal(true)} className='m-3 hover_link'>
                            <FontAwesomeIcon className='fs-5' icon={faPlus} />
                        </div>
                    }
                </div>
                {user.shippingAddress ?
                    <div>
                        <div>Address: {user.shippingAddress.address}</div>
                        <div>City: {user.shippingAddress.city}</div>
                        <div>Country / Province: {user.shippingAddress.country}</div>
                        <div>State: {user.shippingAddress.state}</div>
                        <div>ZipCode / PostalCode: {user.shippingAddress.zipCode}</div>
                    </div>
                    :
                    null
                }
            </div>
        </Container>
    )
}

export default UserData
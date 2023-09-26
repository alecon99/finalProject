import { useContext, useEffect, useState } from 'react';

import { Container, Spinner, Button } from 'react-bootstrap';

import { UsersProvider } from '../../../context/UserContext';

import DeleteUserButton from '../../buttons/deleteUser/DeleteUserButton';

const ManageUser = () => {

    const { allUsers, userCounter, isLoading, getAllUsers } = useContext(UsersProvider);

    const [showDeleteUser, setShowDeleteuser] = useState(null);

    useEffect(() => {
        getAllUsers();
    }, [])

    return (
        <Container className='padding_top_100 pb-5' >
            {isLoading ?
                <div className='mt-5 text-center'>
                    <div>Loading ...</div>
                    <Spinner animation="grow" />
                </div>
                :
                <div >
                    <div className='d-flex  align-items-center justify-content-between'>
                        <h3 className='bg-black text-white p-2 rounded-2'>Total users: {userCounter}</h3>
                    </div>
                    {allUsers && allUsers.map((user) => {
                        return (
                            <div key={user._id} className='my-3 p-3 border rounded'>
                                <div className='border-bottom'>
                                    <div>Name: {user.name}</div>
                                    <div>Surname: {user.surname}</div>
                                    <div>Email: {user.email}</div>
                                    <div >Role:
                                        <span className={`ms-1 ${user.role === "admin" ? 'text-danger' : null}`}>
                                            {user.role}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    {user.role !== "admin" ?
                                        <div className='pt-2 fw-bold text-danger hover_link_red ' onClick={() => setShowDeleteuser(user._id)}>Delete user #{user._id}</div>
                                        :
                                        <div className='pt-2 fw-bold'>#{user._id}</div>
                                    }
                                    {showDeleteUser === user._id ?
                                        <div className='border bg-light rounded p-2 d-flex justify-content-around align-items-center'>
                                            <div>Do you want to proceed?</div>
                                            <DeleteUserButton userId={user._id} />
                                            <Button variant='success' className='fw-bold border rounded p-2' onClick={() => setShowDeleteuser(null)}>No</Button>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </Container >
    )
}

export default ManageUser
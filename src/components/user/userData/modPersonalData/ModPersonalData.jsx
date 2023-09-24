import { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useSession } from '../../../../middlewares/ProtectedRoutes';
import { UsersProvider } from '../../../../context/UserContext';

const ModPersonalData = ({ setShowLoginModal }) => {

    const session = useSession();

    const { getUserById, user } = useContext(UsersProvider)

    const [formLoginData, setFormLoginData] = useState({})

    return (
        <Form>
            <div className='text-center fs-4'>Edit</div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <div>Email</div>
                <Form.Control placeholder={user.email} type="text" onChange={(e) => setFormLoginData({
                    ...formLoginData,
                    email: e.target.value
                })} />
            </Form.Group>
            <div className='text-center fs-4 my-3'>and/or</div>
            <div>Password</div>
            <div className='border rounded p-2'>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <div>old</div>
                    <Form.Control type="text" onChange={(e) => setFormLoginData({
                        ...formLoginData,
                        password: e.target.value
                    })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <div>new</div>
                    <Form.Control type="password" onChange={(e) => setFormLoginData({
                        ...formLoginData,
                        password: e.target.value
                    })} />
                </Form.Group>
            </div>

            <div className='mt-3 d-flex justify-content-between'>
                <Button variant="success" >
                    Save
                </Button>
            </div>
        </Form>
    )
}

export default ModPersonalData
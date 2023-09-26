import { useContext, useState } from 'react';

import { Button, Form } from 'react-bootstrap';

import { useSession } from '../../../../middlewares/ProtectedRoutes';

import { UsersProvider } from '../../../../context/UserContext';

const ModLoginData = ({ setShow }) => {

    const session = useSession();

    const { getUserById, user } = useContext(UsersProvider);

    const [passwordData, setPasswordData] = useState({});
    const [emailData, setEmailData] = useState();
    const [passError, setPassError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const modEmail = async () => {

        const payload = {
            email: emailData
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/user/modEmail/${session.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            getUserById();
            setShow(false);
        } catch (error) {
            console.error(error);
            setEmailError(true);
        }
    }

    const modPassword = async () => {

        const payload = {
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/user/modPassword/${session.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            getUserById();
            setShow(false);
        } catch (error) {
            console.error(error);
            setPassError(true)
        }
    }

    return (
        <Form>
            <div className='text-center fs-4'>Edit</div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <div>Email</div>
                <Form.Control placeholder={user.email} type="text" onChange={(e) => setEmailData(e.target.value)} />
            </Form.Group>
            <div className='mt-3 d-flex align-items-center'>
                <Button variant="success" onClick={modEmail}>
                    Save
                </Button>
                {emailError ?
                    <div className='ms-3 text-danger'>Invalid email</div>
                    :
                    null
                }
            </div>
            <div className='text-center fs-4 my-3'>and/or</div>
            <div>Password</div>
            <div className='border rounded p-2'>
                <Form.Group className="mb-3" controlId="formBasicOldPassword">
                    <div>old</div>
                    <Form.Control type="text" onChange={(e) => setPasswordData({
                        ...passwordData,
                        oldPassword: e.target.value
                    })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNewPassword">
                    <div>new</div>
                    <Form.Control type="password" onChange={(e) => setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value
                    })} />
                </Form.Group>
            </div>

            <div className='mt-3 d-flex align-items-center'>
                <Button variant="success" onClick={modPassword}>
                    Save
                </Button>
                {passError ?
                    <div className='ms-3 text-danger'>Invalid password</div>
                    :
                    null
                }
            </div>
        </Form>
    )
}

export default ModLoginData
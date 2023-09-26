import { useContext, useState, useEffect } from 'react';

import { Button, Col, Form, Row } from 'react-bootstrap';

import { UsersProvider } from '../../../../context/UserContext';

import { useSession } from '../../../../middlewares/ProtectedRoutes';

const ModPersonalData = ({ setShow }) => {

    const { getUserById, user } = useContext(UsersProvider);

    const session = useSession();

    const [phoneNumber, setPhoneNumber] = useState({});
    const [personalData, setPersonalData] = useState({});

    useEffect(() => {
        if (user.phone) {
            setPhoneNumber({
                prefix: user.phone.prefix,
                number: user.phone.number
            });
        }
    }, [])

    const modPersonalData = async () => {

        const payload = {
            name: personalData.name,
            surname: personalData.surname,
            phone: {
                prefix: phoneNumber.prefix,
                number: phoneNumber.number

            }
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/user/modPersonalData/${session.id}`, {
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
        }
    }

    return (
        <Form>
            <div className='text-center fs-4'>Edit</div>
            <Form.Group className="mb-3" controlId="formBasicName">
                <div>Name</div>
                <Form.Control placeholder={user.name} type="text" onChange={(e) => setPersonalData({
                    ...personalData,
                    name: e.target.value
                })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSurname">
                <div>Surname</div>
                <Form.Control type="text" placeholder={user.surname} onChange={(e) => setPersonalData({
                    ...personalData,
                    surname: e.target.value
                })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
                <div>Phone</div>
                <Row className='d-flex border p-2 mx-1 rounded'>
                    <Col xs={3}>
                        <div>prefix</div>
                        <Form.Control type="number" placeholder={phoneNumber.prefix} onChange={(e) => setPhoneNumber({
                            ...phoneNumber,
                            prefix: e.target.value
                        })} />
                    </Col>
                    <Col>
                        <div>number</div>
                        <Form.Control type="text" placeholder={phoneNumber.number} onChange={(e) => setPhoneNumber({
                            ...phoneNumber,
                            number: e.target.value
                        })} />
                    </Col>
                </Row>
            </Form.Group>

            <div className='mt-3 d-flex align-items-center'>
                <Button variant="success" onClick={modPersonalData} >
                    Save
                </Button>
            </div>
        </Form>
    )
}

export default ModPersonalData
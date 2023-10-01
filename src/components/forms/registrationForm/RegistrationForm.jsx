import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Col, Container, Row, Button, Form } from 'react-bootstrap';

import axios from "axios";

import '../../forms/Forms.css';

const LoginForms = () => {

    const navigate = useNavigate();

    const [loginFormData, setLoginFormData] = useState({});
    const [password, setVerifyPassword] = useState(null);
    const [error, setError] = useState(false);

    const verifyCredentials = () => {
        if (loginFormData.password === password) {
            registration();
        }
        setError(true);
    }

    const registration = async () => {

        try {
            await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/user/registration`, loginFormData)
                .then((res) => navigate("/login"))
                .then(sendEmail())

        } catch (error) {
            console.log("password o email non valida");
            setError(true);
        }
    }

    const sendEmail = async () => {

        const payload = {
            subject: `Welcome ${loginFormData.name} ${loginFormData.surname}`,
            text: "Thank you from the NewLife team for registering on our site",
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/sendEmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
        } catch (error) {
            console.error("Failed to send email");
        }

    }

    return (
        <div id='container_login_form'>
            <Container id='registration_form'>
                <Row className='d-flex align-items-center'>
                    <Col sm={6} >
                        <h1 className='text-center text-sm-end  me-sm-4'>Insert your data</h1>
                    </Col>
                    <Col sm={6}>
                        <div className='d-flex justify-content-center d-sm-block'>
                            <Form
                                id='login_form'
                                className='ms-sm-4 '
                            >
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setLoginFormData({
                                        ...loginFormData,
                                        name: e.target.value
                                    })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicSurname">
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setLoginFormData({
                                        ...loginFormData,
                                        surname: e.target.value
                                    })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" onChange={(e) => setLoginFormData({
                                        ...loginFormData,
                                        email: e.target.value
                                    })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password (min: 5 characters)</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setVerifyPassword(e.target.value)}
                                    />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control type="password" onChange={(e) => setLoginFormData({
                                        ...loginFormData,
                                        password: e.target.value
                                    })}
                                    />
                                </Form.Group>
                                <div className='d-flex align-items-center'>
                                    <Button variant="dark" onClick={verifyCredentials}>
                                        Sign in
                                    </Button>
                                    {error ?
                                        <div className='ms-3 text-danger'>Enter the data correctly</div>
                                        :
                                        null
                                    }
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginForms
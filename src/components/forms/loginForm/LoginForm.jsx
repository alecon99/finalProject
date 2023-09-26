import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Col, Container, Row, Button, Form } from 'react-bootstrap';

import axios from "axios";

import '../../forms/Forms.css';

const LoginForms = () => {

    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState({});
    const [alertMessage, setAlertMessage] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            setAlertMessage(false)
            await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, loginFormData)
                .then((res) => {
                    localStorage.setItem("userLoggedIn", JSON.stringify(res.data.token))
                })
                .then(() => navigate("/successLogin"))

        } catch (error) {
            console.log("Invalid email or password");
            setAlertMessage(true);
        }
    }

    return (
        <div id='container_login_form'>
            <Container id='registration_form'>
                <Row className='d-flex align-items-center'>
                    <Col sm={6} >
                        <h1 className='text-center text-sm-end  me-sm-4'>Insert your credentials</h1>
                    </Col>
                    <Col sm={6}>
                        <div className='d-flex justify-content-center d-sm-block'>
                            <Form
                                onSubmit={onSubmit}
                                id='login_form'
                                className='ms-sm-4 '
                            >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" onChange={(e) => setLoginFormData({
                                        ...loginFormData,
                                        email: e.target.value
                                    })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={(e) => setLoginFormData({
                                        ...loginFormData,
                                        password: e.target.value
                                    })}
                                    />
                                </Form.Group>
                                <div className='d-flex align-items-center'>
                                    <Button variant='dark' type="submit">
                                        Login
                                    </Button>
                                    {alertMessage ?
                                        <div className='ms-2 text-danger'>Incorrect email or password !</div>
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
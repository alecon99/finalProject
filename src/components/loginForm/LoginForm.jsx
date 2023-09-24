import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../loginForm/LoginForm.css'

import { Col, Container, Row, Button, Form } from 'react-bootstrap';


const LoginForms = () => {

    const navigate = useNavigate()
    const [loginFormData, setLoginFormData] = useState({})
    const [alertMessage, setAlertMessage] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            setAlertMessage(false)
            await axios.post(`http://localhost:5050/login`, loginFormData)
                .then((res) => {
                    localStorage.setItem("userLoggedIn", JSON.stringify(res.data.token))
                })
                .then(() => navigate("/successLogin"))

        } catch (error) {
            console.log("password o email non valida")
            setAlertMessage(true)
        }
    }

    const handleLoginGoogle = () => {
        window.location.href = `http://localhost:5050/auth/google`
    }

    return (

        <div id='container_login_form'>
            <Container>
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
                <div className='fs-1 text-center my-5'>Or</div>
                <div className='d-flex align-items-center justify-content-center'>
                    <h4 className='m-0'>log in with</h4>
                    <Button className='ms-3' onClick={handleLoginGoogle} variant="dark" type="submit" >
                        Google login
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export default LoginForms
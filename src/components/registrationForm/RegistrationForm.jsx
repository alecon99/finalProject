import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../loginForm/LoginForm.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';

const LoginForms = () => {

    const navigate = useNavigate()
    const [ loginFormData, setLoginFormData ] = useState({})

    const onSubmit = async (e)=>{
        e.preventDefault();
        
        try {
            await axios.post(`http://localhost:5050/user/registration`,loginFormData)
            .then((res) => navigate("/login"))
      
        } catch (error) {
            console.log("password o email non valida")
            alert("inserisci password e email")
        }    
    }

  return ( 
    <div id='container_login_form'> 
        <Container>
            <Row className='d-flex align-items-center'>
                <Col sm={6} >
                    <h1 className='text-center text-sm-end  me-sm-4'>Insert your data</h1>
                </Col>
                <Col sm={6}>
                    <div className='d-flex justify-content-center d-sm-block'>
                        <Form 
                        onSubmit={onSubmit}
                        id='login_form'
                        className='ms-sm-4 '
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" onChange={(e)=> setLoginFormData({
                                        ...loginFormData,
                                        name: e.target.value
                                    })} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control type="text" onChange={(e)=> setLoginFormData({
                                        ...loginFormData,
                                        surname: e.target.value
                                    })} 
                                />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" onChange={(e)=> setLoginFormData({
                                        ...loginFormData,
                                        email: e.target.value
                                    })} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={(e)=> setLoginFormData({
                                        ...loginFormData,
                                        password: e.target.value
                                    })}
                                />
                            </Form.Group>
                            <Button variant="success" type="submit">
                                sign in
                            </Button>
                        </Form>
                    </div>
                    
                </Col>
            </Row>
            <div className='fs-1 text-center my-5'>Or</div>
            <div className='d-flex align-items-center justify-content-center'>
                <h4>log in with</h4>
                <Button className='ms-3'>google</Button>
            </div>
        </Container>
    </div>
  )
}

export default LoginForms
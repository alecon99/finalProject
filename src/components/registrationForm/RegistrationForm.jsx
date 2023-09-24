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
    const [ password, setVerifyPassword ] = useState(null)
    const [ error , setError ] = useState(false)

    const verifyCredentials = ()=>{
        if(loginFormData.password === password){
            registration()
        }
        setError(true)
    }

    const registration = async ()=>{
        
        try {
            await axios.post(`http://localhost:5050/user/registration`,loginFormData)
            .then((res) => navigate("/login"))
      
        } catch (error) {
            console.log("password o email non valida")
            setError(true)
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
                                <Form.Control type="text" onChange={(e)=> setLoginFormData({
                                        ...loginFormData,
                                        name: e.target.value
                                    })} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicSurname">
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
                                <Form.Control type="text" onChange={(e)=> setVerifyPassword(e.target.value)}
                                />
                                
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control type="password" onChange={(e)=> setLoginFormData({
                                        ...loginFormData,
                                        password: e.target.value
                                    })}
                                />
                            </Form.Group>
                            <div className='d-flex align-items-center'>
                            <Button variant="dark" onClick={verifyCredentials}>
                                sign in
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
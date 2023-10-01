import { useState, useContext, useEffect } from 'react';

import { useSession } from '../../../../middlewares/ProtectedRoutes';

import { Button, Form } from 'react-bootstrap';

import { UsersProvider } from '../../../../context/UserContext';

const AddUserAddress = ({ setShow }) => {

    const session = useSession();

    const { getUserById, user } = useContext(UsersProvider);

    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [zipCode, setZipCode] = useState(null);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (user.shippingAddress) {
            setAddress(user.shippingAddress.address);
            setCity(user.shippingAddress.city);
            setState(user.shippingAddress.state);
            setZipCode(user.shippingAddress.zipCode);
            setCountry(user.shippingAddress.country);
        } else {
            setAddress(null);
            setCity(null);
            setState(null);
            setZipCode(null);
            setCountry(null);
        }
    }, [user])

    const addAddress = async () => {

        const payload = {
            shippingAddress: {
                address: address,
                city: city,
                state: state,
                zipCode: zipCode,
                country: country,
            }
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/user/newAddress/${session.id}`, {
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
            <Form.Group className="mb-3" controlId="formBasicAddress">
                <div>Address</div>
                <Form.Control placeholder={address} type="text" onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCity">
                <div>City</div>
                <Form.Control placeholder={city} type="text" onChange={(e) => setCity(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicState">
                <div>State</div>
                <Form.Control placeholder={state} type="text" onChange={(e) => setState(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicZipCode">
                <div>ZipCode/PostalCode</div>
                <Form.Control placeholder={zipCode} type="number" step=".01" onChange={(e) => setZipCode(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCountry">
                <div>Country/Province</div>
                <Form.Control placeholder={country} type="text" onChange={(e) => setCountry(e.target.value)} />
            </Form.Group>

            <div className='mt-3 d-flex justify-content-between'>
                <Button variant="success" onClick={addAddress}>
                    Save
                </Button>
            </div>
        </Form>
    )
}

export default AddUserAddress
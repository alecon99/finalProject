import { useState, useContext } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'

import { ProductsProvider } from '../../../context/ProductsContext';

const AddProduct = () => {

    const { getAllProducts } = useContext(ProductsProvider)

    const [show, setShow] = useState(false);
    const [productFormData, setProductFormData] = useState({})
    const [buttonAvailable, setButtonAvailable] = useState("success")
    const [buttonNotAvailable, setButtonNotAvailable] = useState("danger")

    const closeModal = () => {
        setShow(false);
        setButtonAvailable("success")
        setButtonNotAvailable("danger")
    }
    const handleShow = () => setShow(true);

    const funcionButtonAvailable = () => {
        setProductFormData({
            ...productFormData,
            availability: true
        })
        setButtonAvailable("success")
        setButtonNotAvailable("secondary")
    }

    const funcionButtonNotAvailable = () => {
        setProductFormData({
            ...productFormData,
            availability: false
        })
        setButtonNotAvailable("danger")
        setButtonAvailable("secondary")
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5050/newProduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productFormData),
            });
            getAllProducts()
            setShow(false);
        } catch (error) {
            console.error("Failed to save the post");
        }
    } 

return (
    <>
        <Button variant="secondary" onClick={handleShow}>
            Add product
        </Button>

        <Modal
            show={show}
            onHide={closeModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    onSubmit={onSubmit}
                >
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={(e) => setProductFormData({
                            ...productFormData,
                            name: e.target.value
                        })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" onChange={(e) => setProductFormData({
                            ...productFormData,
                            description: e.target.value
                        })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" onChange={(e) => setProductFormData({
                            ...productFormData,
                            image: e.target.value
                        })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" step=".01" onChange={(e) => setProductFormData({
                            ...productFormData,
                            price: e.target.value
                        })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" onChange={(e) => setProductFormData({
                            ...productFormData,
                            category: e.target.value
                        })}
                        />
                    </Form.Group>

                    <div>Availability</div>
                    <div className='d-flex justify-content-evenly align-items-center border py-2 mt-2 rounded'>

                        <Button variant={buttonAvailable} onClick={(e) => funcionButtonAvailable()}>
                            <FontAwesomeIcon icon={faCheck} />
                        </Button>
                        <Button variant={buttonNotAvailable} onClick={(e) => funcionButtonNotAvailable()}>
                            <FontAwesomeIcon icon={faX} />
                        </Button>
                    </div>


                    <div className='mt-3 d-flex justify-content-between'>
                        <Button variant="success" type="submit">
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    </>
)
}

export default AddProduct
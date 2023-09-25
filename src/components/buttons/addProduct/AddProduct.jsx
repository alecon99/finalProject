import { useState, useContext } from 'react';

import { Button, Modal, Form, Spinner } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

import { ProductsProvider } from '../../../context/ProductsContext';

const AddProduct = () => {

    const { getAllProducts } = useContext(ProductsProvider);

    const [show, setShow] = useState(false);
    const [productFormData, setProductFormData] = useState({});
    const [buttonAvailable, setButtonAvailable] = useState("success");
    const [buttonNotAvailable, setButtonNotAvailable] = useState("danger");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = () => {
        setShow(false);
        setButtonAvailable("success");
        setButtonNotAvailable("danger");
    }

    const funcionButtonAvailable = () => {
        setProductFormData({
            ...productFormData,
            availability: true
        });
        setButtonAvailable("success");
        setButtonNotAvailable("secondary");
    }

    const funcionButtonNotAvailable = () => {
        setProductFormData({
            ...productFormData,
            availability: false
        });
        setButtonNotAvailable("danger");
        setButtonAvailable("secondary");
    }

    const uploadImage = async (image) => {
        const fileData = new FormData();
        fileData.append("image", image);

        try {
            const response = await fetch(`http://localhost:5050/image/cloudUploadImg`, {
                method: "POST",
                body: fileData,
            });
            return await response.json();
        } catch (error) {
            console.error("Image upload errors occurred");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (image) {
            try {
                setIsLoading(true)
                const uploadedImage = await uploadImage(image)
                const formData = {
                    ...productFormData,
                    image: uploadedImage.image,
                }

                const response = await fetch(`http://localhost:5050/newProduct`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                setIsLoading(false)
                getAllProducts()
                setShow(false);
            } catch (error) {
                console.error("Failed to save the post");
            }
        } else {
            console.error('Select the image to upload')
        }
    }
    return (
        <>
            <Button variant="secondary" onClick={()=> setShow(true)}>
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
                        encType='multipart/form-data'
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
                            <textarea type="text" rows={5} cols={55} className='d-flex border rounded' onChange={(e) => setProductFormData({
                                ...productFormData,
                                description: e.target.value
                            })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name='image' onChange={(e)=>setImage(e.target.files[0])}
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
                            <Button variant="success" type="submit" className='d-flex align-items-center'>
                                {isLoading ?
                                    <Spinner/>
                                    :
                                    <div>Save</div>
                                }
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default AddProduct
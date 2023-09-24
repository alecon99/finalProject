import { useContext, useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { ModalModifyProvider } from '../../../../context/ModalModifyProductContext';
import { SelectedProductProvider } from '../../../../context/SelectedProduct';
import DeleteProductButton from '../../../buttons/deleteProduct/DeleteProductButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { ProductsProvider } from '../../../../context/ProductsContext';

const ModalModifyProduct = () => {

    const { show, setShow } = useContext(ModalModifyProvider)
    const { selected, setSelected } = useContext(SelectedProductProvider)
    const { getAllProducts } = useContext(ProductsProvider)

    const [buttonAvailable, setButtonAvailable] = useState("success")
    const [buttonNotAvailable, setButtonNotAvailable] = useState("danger")
    const [productFormData, setProductFormData] = useState({})
    const [image, setImage] = useState(null)

    const handleClose = () => {
        setShow(false);
        setSelected({})
        setProductFormData({})
    }

    const funcionButtonAvailable = () => {
        setProductFormData({
            ...productFormData,
            availability: true
        })
        setButtonNotAvailable("secondary")
        setButtonAvailable("success")
    }

    const funcionButtonNotAvailable = () => {
        setProductFormData({
            ...productFormData,
            availability: false
        })
        setButtonNotAvailable("danger")
        setButtonAvailable("secondary")
    }

    useEffect(() => {
        if (selected.availability) {
            setButtonNotAvailable("secondary")
            setButtonAvailable("success")
        }
        if (!selected.availability) {
            setButtonNotAvailable("danger")
            setButtonAvailable("secondary")
        }
    }, [selected])

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
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
                const uploadedImage = await uploadImage(image)
                const formData = {
                    ...productFormData,
                    image: uploadedImage.image,
                }

                const response = await fetch(`http://localhost:5050/modProduct/${selected._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
                getAllProducts()
                setShow(false);
            } catch (error) {
                console.error("Failed to save the post");
            }
        } else {
            try {
                const response = await fetch(`http://localhost:5050/modProduct/${selected._id}`, {
                method: "PUT",
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
    }

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modify the product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={onSubmit}
                        encType='multipart/form-data'
                    >
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder={selected.name} type="text" onChange={(e) => setProductFormData({
                                ...productFormData,
                                name: e.target.value
                            })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <textarea rows={5} cols={55} className='d-flex border rounded' placeholder={selected.description} type="text" onChange={(e) => setProductFormData({
                                ...productFormData,
                                description: e.target.value
                            })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name='image' onChange={handleImageChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control placeholder={selected.price} type="number" step=".01" onChange={(e) => setProductFormData({
                                ...productFormData,
                                price: e.target.value
                            })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control placeholder={selected.category} type="text" onChange={(e) => setProductFormData({
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
                                Save changes
                            </Button>
                            <DeleteProductButton productId={selected._id} />
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalModifyProduct
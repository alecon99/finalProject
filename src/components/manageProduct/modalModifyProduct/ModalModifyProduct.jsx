import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ModalModifyProvider } from '../../../context/ModalModifyProductContext';
import { SelectedProductProvider } from '../../../context/SelectedProduct';
import DeleteProductButton from '../../buttons/deleteProduct/DeleteProductButton';

const ModalModifyProduct = () => {

    const { show, setShow } = useContext(ModalModifyProvider)
    const { selected, setSelected } = useContext(SelectedProductProvider)

    const [ productFormData , setProductFormData ] = useState({})

    const handleClose = () => {
        setShow(false);
        setSelected({})
        setProductFormData({})
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
                        /* onSubmit={"onSubmit"} */
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
                            <Form.Control placeholder={selected.description} type="text" onChange={(e) => setProductFormData({
                                ...productFormData,
                                description: e.target.value
                            })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control placeholder={selected.image} type="text" onChange={(e) => setProductFormData({
                                ...productFormData,
                                image: e.target.value
                            })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control placeholder={selected.price} type="number" onChange={(e) => setProductFormData({
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

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Availability</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>select</option>
                                <option value="true" onChange={(e) => setProductFormData({
                                    ...productFormData,
                                    availability: e.target.value
                                })}>available</option>
                                <option value="false" onClick={(e) => setProductFormData({
                                    ...productFormData,
                                    availability: e.target.value
                                })}>not available</option>
                            </Form.Select>
                        </Form.Group>

                        <div className='d-flex justify-content-between'>
                            <Button variant="success" type="submit">
                                Save changes
                            </Button>
                            <DeleteProductButton productId={selected._id}/>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalModifyProduct
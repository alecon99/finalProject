import { useContext } from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { ModalModifyProvider } from '../../../../context/ModalModifyProductContext';
import { SelectedProductProvider } from '../../../../context/SelectedProduct';

import '../cardModifyProduct/CardModifyProduct.css';

const CardModifyproduct = ({ product }) => {

    const { setShow } = useContext(ModalModifyProvider);
    const { setSelected } = useContext(SelectedProductProvider);

    const showForm = () => {
        setShow(true);
        setSelected(product);
    }

    return (
        <Container>
            <Row id='card_manage' className='my-3 py-3 border hover_link' onClick={showForm} >
                <Col sm={2} className='d-none d-sm-block'>
                    <img id='img_manage' src={product.image} alt={product.name} />
                </Col>
                <Col sm={10}>
                    <div className='ellipsis'>#{product._id}</div>
                    <div className='ellipsis'>Category: {product.category}</div>
                    <div className='ellipsis'>Name: {product.name}</div>
                    <div>Price: € {product.price}</div>
                    <div className='d-flex'>
                        <div className='me-2'>Available:</div>
                        {product.availability ? <div className='text-success'>Yes</div> : <div className='text-danger'>No</div>}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default CardModifyproduct
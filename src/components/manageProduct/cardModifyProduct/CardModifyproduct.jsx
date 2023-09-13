import { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ModalModifyProvider } from '../../../context/ModalModifyProductContext'
import '../cardModifyProduct/CardModifyProduct.css'
import { SelectedProductProvider } from '../../../context/SelectedProduct'

const CardModifyproduct = ({product}) => {
    const { show, setShow } = useContext(ModalModifyProvider)
    const { selected, setSelected } = useContext(SelectedProductProvider)

    const showForm = () => {
        setShow(true);
        setSelected(product)
    }
    

    return (
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
    )
}

export default CardModifyproduct
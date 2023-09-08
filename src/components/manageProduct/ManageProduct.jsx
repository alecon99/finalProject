import { useContext,useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ProductsProvider } from '../../context/ProductsContext'

import '../manageProduct/ManageProduct.css'

const ManageProduct = () => {

    const { allProducts, productsCounter, isLoading, getAllProducts } = useContext(ProductsProvider)

    useEffect(()=>{
        getAllProducts()
    },[])

  return (
    <Container>
        <Row className='mt-5'>
            <Col sm={6} className='mt-5' id='products_manage_container'>
                {allProducts && allProducts.map((product)=>{
                    return(
                        <Row id='card_manage' className='my-3 border p-2' key={product._id}>
                            <Col sm={4} className='d-none d-sm-block'>
                                <img id='img_manage' src={product.image} alt="" />
                            </Col>
                            <Col sm={8}>
                                <div className='ellipsis'>#{product._id}</div>
                                <div className='ellipsis'>Category: {product.category}</div>
                                <div className='ellipsis'>Name: {product.name}</div>
                                <div>Price: € {product.price}</div>
                                <div className='d-flex'>
                                    <div className='me-2'>Availability:</div>
                                    {product.availability? <div className='text-success'>Yes</div>:<div className='text-danger'>No</div>}
                                </div>
                            </Col>
                        </Row>
                    )
                })}
            </Col>
        </Row>
    </Container>
  )
}

export default ManageProduct
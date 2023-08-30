import React, { useContext, useEffect } from 'react'
import { ProductsProvider } from '../../../context/ProductsContext'
import SingleCard from '../singleCard/SingleCard'

/* reactBootstrap */
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Cards = () => {

    const { products, isLoading, getProducts } = useContext(ProductsProvider)

    useEffect(()=>{
        getProducts()
    },[])

  return (
    <div>
        <Row>
            {products && products.map((product)=>{
                return(
                    <Col  key={product._id} xs={12} sm={6} md={6} lg={3}>
                    <SingleCard
                        productProps={product}
                    />
                </Col>
                )
            })}
        </Row>
    </div>
  )
}

export default Cards
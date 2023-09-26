import { useState, useEffect } from 'react'

import { Col, Row } from 'react-bootstrap';

import SingleCard from '../singleCard/SingleCard';
import SingleCardRecommended from '../singleCardRecommended/SingleCardRecommended';

const CardsRecommended = ({ category }) => {

    const [recommendedProducts, serRecommendedProducts] = useState({})

    const getRecommendedProduct = async () => {
        try {
            const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/recomendedProducts/${category}`);
            const response = await data.json();
            serRecommendedProducts(response.products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getRecommendedProduct();
    }, [])

    return (
        <Row >
            {recommendedProducts[0] && recommendedProducts.map((product) => {
                return (
                    <Col key={product._id} xs={6} sm={4} lg={2}>
                        <SingleCardRecommended
                            productProps={product}
                        />
                    </Col>
                )
            })}
        </Row>
    )
}

export default CardsRecommended
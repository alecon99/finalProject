import { useState, useEffect } from 'react'

import { Col, Row, Spinner } from 'react-bootstrap';

import SingleCardRecommended from '../singleCardRecommended/SingleCardRecommended';

const CardsRecommended = ({ category }) => {

    const [recommendedProducts, serRecommendedProducts] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const getRecommendedProduct = async () => {
        try {
            setIsLoading(true)
            const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/recomendedProducts/${category}`);
            const response = await data.json();
            serRecommendedProducts(response.products);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getRecommendedProduct();
    }, [])

    return (
        <Row >
            {isLoading ?
                <div className='text-center'>
                    <Spinner />
                </div>
                :
                <>
                    {recommendedProducts[0] && recommendedProducts.map((product) => {
                        return (
                            <Col key={product._id} xs={6} sm={4} lg={2}>
                                <SingleCardRecommended
                                    productProps={product}
                                />
                            </Col>
                        )
                    })}
                </>
            }
        </Row>
    )
}

export default CardsRecommended
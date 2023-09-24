import { useContext, useEffect } from 'react'

import { Container, Spinner } from 'react-bootstrap'

import CardModifyproduct from './cardModifyProduct/CardModifyproduct'
import AddProduct from '../../buttons/addProduct/AddProduct'

import { ProductsProvider } from '../../../context/ProductsContext'

const ManageProduct = () => {

    const { allProducts, productsCounter, isLoading, getAllProducts } = useContext(ProductsProvider)

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <Container className='padding_top_100 pb-5' >
            {isLoading ?
                <div className='mt-5 text-center'>
                    <div>Loading ...</div>
                    <Spinner animation="grow" />
                </div>
                :
                <div >
                    <div className='d-flex  align-items-center justify-content-between'>
                        <h3 className='bg-black text-white p-2 rounded-2 m-0'>Total products: {productsCounter}</h3>
                        <AddProduct />
                    </div>
                    {allProducts && allProducts.map((product) => {
                        return (
                            <CardModifyproduct product={product} key={product._id} />
                        )
                    })}
                </div>
            }
        </Container >
    )
}

export default ManageProduct
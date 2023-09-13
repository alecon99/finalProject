import { useContext, useEffect } from 'react'

import { Container, Spinner} from 'react-bootstrap'

import { ProductsProvider } from '../../context/ProductsContext'

import CardModifyproduct from './cardModifyProduct/CardModifyproduct'
import AddProduct from '../buttons/addProduct/AddProduct'

import '../manageProduct/ManageProduct.css'

const ManageProduct = () => {

    const { allProducts, productsCounter, isLoading, getAllProducts } = useContext(ProductsProvider)

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <Container id='products_manage_container' >
            {isLoading ? 
                <div className='mt-5 text-center'>
                    <Spinner animation="grow" />
                </div>               
                :
                <div >
                    <div className='d-flex  align-items-center justify-content-between'>
                        <h3 className='bg-black text-white p-2 rounded-2'>Total products: {productsCounter}</h3>
                        <AddProduct/>
                    </div>
                    {allProducts && allProducts.map((product) => {
                        return (
                            <CardModifyproduct product={product} key={product._id}/>
                        )
                    })}
                </div>
            }
        </Container >
    )
}

export default ManageProduct
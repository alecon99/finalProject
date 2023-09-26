import { useContext } from 'react'

import { useSession } from '../../../middlewares/ProtectedRoutes'

import { Button } from 'react-bootstrap'

import { ModalModifyProvider } from '../../../context/ModalModifyProductContext'
import { ProductsProvider } from '../../../context/ProductsContext'

const DeleteProductButton = ({ productId }) => {

    const { setShow } = useContext(ModalModifyProvider);
    const { getAllProducts } = useContext(ProductsProvider);

    const session = useSession();

    const deleteProduct = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/deleteProduct/${productId}`, {
                method: "DELETE"
            });
            getAllProducts();
            setShow(false);

        } catch (error) {
            console.error("Failed to delete the product");
        }
    };

    return (
        <Button className='btn-danger' onClick={deleteProduct}>Delete product</Button>
    )
}

export default DeleteProductButton
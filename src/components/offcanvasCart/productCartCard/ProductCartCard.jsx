import { useEffect, useContext } from 'react'
import { CartProvider } from '../../../context/CartContext'
import '../productCartCard/ProductCartCard.css'
import { Col, Row } from 'react-bootstrap'
import DeleteCartButton from '../../buttons/deleteCartButton/DeleteCartButton'
import { useNavigate } from 'react-router-dom';

const ProductCartCard = () => {

    const { cartProducts, cartCounter, isLoading, getCartProducts } = useContext(CartProvider)

    const navigate = useNavigate();

    useEffect(()=>{
        getCartProducts()
    },[])

  return (
    <div>
        {cartProducts && cartProducts.map((product)=>{

            const detail = ()=>{
            navigate(`/detail/${product.product.id}`);
            }

                return(
                    <Row className='my-4' key={product._id} >
                        <Col xs={2} className='text-center'>
                            <img id='card_cart_img' src={product.product.img} alt="" />
                        </Col>
                        <Col xs={8}>
                            <div onClick={detail} className='hover_link'>
                                <div id='card_cart_name' >{product.product.name}</div>
                                <div className='d-flex justify-content-between'>
                                    <div>€ {product.product.price}</div>
                                    <div>Qt: {product.quantity}</div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={2} className='pt-2 fs-4'>
                            <DeleteCartButton cartId={product._id}/>
                        </Col>
                    </Row>
                )
            })}
    </div>
  )
}

export default ProductCartCard
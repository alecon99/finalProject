import { createContext, useState, useEffect } from "react";
import { useSession } from '../middlewares/ProtectedRoutes';

export const CartProvider = createContext();

export const CartContext = ({ children }) => {

    const session = useSession();

    const [show, setShow] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState("");

    const getCartProducts = async (id) => {

        let userId = null;

        if(id){
            userId = id
        }else{
            userId = session.id
        }

        try {
            setIsLoading(true);
            const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/user/cart/${userId}`);
            const response = await data.json();
            setCartProducts(response.cart);
            setIsLoading(false);
            productsCartSum();

        } catch (error) {
            console.log(error);
        }
    }

    const cartCounter = cartProducts.length;

    const productsCartSum = () => {

        let sum = 0;
        let partialSum = 0;

        for (let i = 0; i < cartProducts.length; i++) {

            partialSum = cartProducts[i].product.price * cartProducts[i].quantity;
            sum += partialSum;
        }

        let rounded = Math.round((sum + Number.EPSILON) * 100) / 100;
        setTotalPrice(rounded);
    }

    return (
        <CartProvider.Provider value={{ cartProducts, cartCounter, totalPrice, isLoading, show, setCartProducts, setShow, productsCartSum, getCartProducts }}>
            {children}
        </CartProvider.Provider>
    )

};

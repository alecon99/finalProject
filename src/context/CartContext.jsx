import { createContext, useState } from "react";
import { useSession } from '../middlewares/ProtectedRoutes'

export const CartProvider = createContext();

export const CartContext = ({ children }) => {

    const session = useSession();

    const [cartProducts, setCartProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState("")

    const getCartProducts = async () => {
        try {
            setIsLoading(true)
            const data = await fetch(`http://localhost:5050/user/cart/${session.id}`)
            const response = await data.json()
            setCartProducts(response.cart)
            setIsLoading(false)
            productsCartSum()
        } catch (error) {
            console.log(error)
        }
    }
    
    const cartCounter = cartProducts.length;

    const productsCartSum = () => {

        let sum = 0;

        for (let i = 0; i < cartProducts.length; i++) {
            sum += cartProducts[i].product.price;
        }
        setTotalPrice(sum)
    }

    return (
        <CartProvider.Provider value={{ cartProducts, setCartProducts, cartCounter, totalPrice, isLoading, productsCartSum, getCartProducts }}>
            {children}
        </CartProvider.Provider>
    )

};

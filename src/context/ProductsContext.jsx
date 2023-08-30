import { createContext, useState } from "react";

export const ProductsProvider = createContext();

export const ProductsContext = ({ children }) => {

    const [ products, setProducts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const getProducts = async ()=>{
        try {
            setIsLoading(true)
            const data = await fetch(`http://localhost:5050/products`)
            const response = await data.json()
            setProducts(response.products)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <ProductsProvider.Provider value={{ products, isLoading, getProducts }}>
            {children}
        </ProductsProvider.Provider>
    )

};

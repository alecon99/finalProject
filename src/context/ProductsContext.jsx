import { createContext, useState, useContext, useEffect } from "react";
import { PageSizeProvider } from './PageSizeContext'

export const ProductsProvider = createContext();

export const ProductsContext = ({ children }) => {

    const { pageSize, pageIncrement } = useContext(PageSizeProvider)

    const [ products, setProducts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ productsCounter, setProductsCounter ] = useState("")

    useEffect(()=>{
        getProducts()
    },[pageSize])

    const getProducts = async ()=>{
        try {
            setIsLoading(true)
            const data = await fetch(`http://localhost:5050/products?pageSize=${pageSize}`)
            const response = await data.json()
            setProductsCounter(response.counter);
            setProducts(response.products)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <ProductsProvider.Provider value={{ products, productsCounter, isLoading, getProducts }}>
            {children}
        </ProductsProvider.Provider>
    )

};

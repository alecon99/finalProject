import { createContext, useState, useContext, useEffect } from "react";
import { PageSizeProvider } from './PageSizeContext'

export const ProductsProvider = createContext();

export const ProductsContext = ({ children }) => {

    const { pageSize } = useContext(PageSizeProvider)

    const [ products, setProducts ] = useState([]);
    const [ allProducts, setAllProducts ] = useState([]);
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
            setProducts(response.products)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllProducts = async ()=>{
        try {
            setIsLoading(true)
            const data = await fetch(`http://localhost:5050/allProducts`)
            const response = await data.json()
            setProductsCounter(response.counter);
            setAllProducts(response.products)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <ProductsProvider.Provider value={{ products, allProducts, productsCounter, isLoading,getAllProducts, getProducts }}>
            {children}
        </ProductsProvider.Provider>
    )

};

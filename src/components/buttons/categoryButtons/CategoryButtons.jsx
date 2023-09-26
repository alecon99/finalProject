import { useContext, useState } from 'react'

import { ProductsProvider } from '../../../context/ProductsContext'

import { Button } from 'react-bootstrap'

const CategoryButtons = () => {

    const { setProducts, getProducts } = useContext(ProductsProvider);

    const [reset, setReset] = useState(false);

    const resetFilters = () => {
        setReset(false);
        getProducts();
    }

    const getFilterProducts = async (filter) => {
        try {
            const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/filterProducts/${filter}`);
            const response = await data.json();
            setProducts(response.products);
            setReset(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='text-center border-top py-2'>
            {reset ?
                <div className='hover_link_red d-inline-block text-secondary' onClick={() => resetFilters()}>reset filter</div>
                :
                null
            }
            <div className='d-flex flex-wrap justify-content-center'>
                <Button variant='transparent' className='mx-1 hover_link text-nowrap' onClick={() => getFilterProducts("Candle")}>| Candle |</Button>
                <Button variant='transparent' className='mx-1 hover_link text-nowrap' onClick={() => getFilterProducts("Soap")}>| Soap |</Button>
                <Button variant='transparent' className='mx-1 hover_link text-nowrap' onClick={() => getFilterProducts("Diffuser")}>| Diffuser |</Button>
                <Button variant='transparent' className='mx-1 hover_link text-nowrap' onClick={() => getFilterProducts("Accessories")}>| Accessories |</Button>
            </div>
        </div>

    )
}

export default CategoryButtons
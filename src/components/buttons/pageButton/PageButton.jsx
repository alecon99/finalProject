import { useContext } from 'react'
import { PageSizeProvider } from '../../../context/PageSizeContext'
import { ProductsProvider } from '../../../context/ProductsContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import { Container } from 'react-bootstrap'

const PageButton = () => {
    const { pageSize, pageIncrement } = useContext(PageSizeProvider)
    const { productsCounter } = useContext(ProductsProvider)

  return (
    <Container className='text-center my-3'>
        {productsCounter>pageSize  ?<div onClick={pageIncrement} className='hover_link'>view more <FontAwesomeIcon icon={faChevronDown} /></div>:null}
    </Container>
  )
}

export default PageButton
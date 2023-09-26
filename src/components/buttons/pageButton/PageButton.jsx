import { useContext } from 'react'

import { PageSizeProvider } from '../../../context/PageSizeContext'
import { ProductsProvider } from '../../../context/ProductsContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

import { Container, Spinner } from 'react-bootstrap'

const PageButton = () => {

  const { pageSize, pageIncrement } = useContext(PageSizeProvider);
  const { partialProductsCounter, isLoading } = useContext(ProductsProvider);

  return (
    <Container className='text-center my-3'>
      {partialProductsCounter > pageSize ?
        <div onClick={pageIncrement} className='hover_link'>
          <div>
            view more
          </div>
          {isLoading ?
            <Spinner />
            :
            <FontAwesomeIcon icon={faChevronDown} />
          }
        </div>
        :
        <a href='#' className='hover_link text-black text-decoration-none'>
          <FontAwesomeIcon icon={faChevronUp} />
          <div>Scroll up</div>
        </a>
      }
    </Container>
  )
}

export default PageButton
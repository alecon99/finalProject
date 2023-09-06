import React from 'react'
import '../jumbotron/Jumbotron.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const Jumbotron = () => {
  return (
    <div id='jumbotron_container'>
      <div 
        id='scroll_button' 
        className='text-white'
      >
        Scroll <FontAwesomeIcon icon={faChevronDown} />
      </div>
    </div>
  )
}

export default Jumbotron
import React from 'react'
import '../jumbotron/Jumbotron.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const Jumbotron = () => {
  return (
    <div id='jumbotron_container'>
      {/* <div id='jumbotron_title_lg'className='text-white text-center d-none d-lg-block' >
          "Green is the new Black"
      </div> */}
      <div id='jumbotron_title_xl'className='text-white d-none d-xl-block' >
        <div className='hover_black'>"Green</div>
        <div className='text-nowrap'>is the new</div>
        <div className='hover_green text-end'>Black"</div>
      </div>
      <div id='jumbotron_title_md'className='text-white d-none d-md-block d-xl-none' >
        <div className='hover_black'>"Green</div>
        <div className='text-nowrap'>is the new</div>
        <div className='hover_green text-end'>Black"</div>
      </div>
      <div id='jumbotron_title_xs'className='text-white d-md-none ' >
        <div>"Green</div>
        <div className='text-nowrap'>is the new</div>
        <div className='text-end'>Black"</div>
      </div>
      <div id='scroll_button' className='text-white'>
        Scroll <FontAwesomeIcon icon={faChevronDown} />
      </div>
    </div>
  )
}

export default Jumbotron
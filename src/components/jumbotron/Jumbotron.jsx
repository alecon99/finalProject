import React from 'react'

import '../jumbotron/Jumbotron.css'

import videoBg from '../../media/videoBg.mp4'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const Jumbotron = () => {
  return (
    <div >
      <video id='jumbotron_container' src={videoBg} autoPlay loop muted ></video>
      <div id='jumbotron_title_xl' className='text-white d-none d-xl-block' >
        <div className='hover_black'>"Green</div>
        <div className='text-nowrap'>is the new</div>
        <div className='hover_green text-end'>Black"</div>
      </div>
      <div id='jumbotron_title_md' className='text-white d-none d-md-block d-xl-none' >
        <div className='hover_black'>"Green</div>
        <div className='text-nowrap'>is the new</div>
        <div className='hover_green text-end'>Black"</div>
      </div>
      <div id='jumbotron_title_xs' className='text-white d-md-none ' >
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
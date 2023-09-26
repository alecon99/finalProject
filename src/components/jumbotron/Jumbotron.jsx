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
        <div>"<span className='hover_black'>Green</span></div>
        <div className='text-nowrap'>is the new</div>
        <div className='text-end'><span className='hover_green'>Black</span>"</div>
      </div>
      <div id='jumbotron_title_md' className='text-white d-none d-md-block d-xl-none' >
        <div>"<span className='hover_black'>Green</span></div>
        <div className='text-nowrap'>is the new</div>
        <div className='text-end'><span className='hover_green'>Black</span>"</div>
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
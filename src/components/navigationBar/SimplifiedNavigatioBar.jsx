import React from 'react'
import { Link } from 'react-router-dom'

const SimplifiedNavigatioBar = () => {
  return (
    <div className='bg-black text-center py-2 fixed-top'>
      <Link
        to={'/'}
        className='text-white text-decoration-none font fs-1'
      >NewLife</Link>
    </div>
  )
}

export default SimplifiedNavigatioBar
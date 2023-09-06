import React from 'react'
import { Link } from 'react-router-dom'

const SimplifiedNavigatioBar = () => {
  return (
    <div className='bg-black text-center py-3'>
        <Link 
            to={'/'} 
            className='text-white text-decoration-none'
        >logo</Link>
    </div>
  )
}

export default SimplifiedNavigatioBar
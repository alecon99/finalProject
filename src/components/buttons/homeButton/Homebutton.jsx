import React from 'react'
import { Link } from 'react-router-dom'

const Homebutton = () => {
  return (
    <Link to={'/'} className='text-center bg-black text-white text-decoration-none fixed-bottom hover_link p-1'>Home</Link>
  )
}

export default Homebutton
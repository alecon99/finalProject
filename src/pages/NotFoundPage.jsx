import React from 'react'
import SimplifiedNavigatioBar from '../components/navigationBar/SimplifiedNavigatioBar'
import Homebutton from '../components/buttons/homeButton/Homebutton'

const NotFoundPage = () => {
  return (
    <>
        <SimplifiedNavigatioBar/>
        <div className='padding_top_100 text-center fs-1'>
            <div>error</div>
            <h1 className='fw-bold green'>404</h1>
            <div>PAGE NOT FOUND</div>
            <div className='mt-5 fs-4'>( return to home )</div>
        </div>
        <Homebutton/>
    </>
  )
}

export default NotFoundPage
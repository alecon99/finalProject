import React, { useState, useContext } from 'react'

/* css */
import '../navigationBar/NavigationBar.css'

/* reactBootstrap */
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useSession } from '../../middlewares/ProtectedRoutes'

/* fontAwersome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

/* components */
import UserMenu from './userMenu/UserMenu'


/* context */
import { AdminProvider } from '../../context/AdminContext'

const NavigationBar = () => {

  const { adminRole } = useContext(AdminProvider)

  const session = useSession();

  const [userMenuShow, setUserMenuShow] = useState(false)

  const togleUserMenuShow = () => {
    setUserMenuShow(!userMenuShow)
  }

  return (
    <div 
      id='nav_container' 
      className={`fixed-top py-2 ${adminRole ? 'bg-admin' : 'bg-black'}`}
    >
      <Container className='text-white d-flex justify-content-between align-items-center'>

        {/* user */}
        {session ?
          <div>
            {adminRole ? <div className='text-dark fw-bold'>Admin</div> : <div className='green'>Welcome</div>}
            <div className='d-flex'>
              <div className='fs-4'>{session.name}</div>
              <div className='fs-4 ms-1 d-none d-md-block'>{session.surname}</div>
              <button className='btn text-white' onClick={togleUserMenuShow}>
                {userMenuShow ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
              </button>
            </div>
          </div>
          :
          <div>
            <Link className='hover_link text-white text-decoration-none fs-5' to={"/login"}>Sign in</Link>
            <div>
              or <Link to={'/registration'} className="hover_link text-secondary text-decoration-none">create an account</Link>
            </div>
          </div>
        }

        {/* logo */}
        <Link to={'/'} className='text-end nav_items font fs-1 text-decoration-none text-white'>NewLife</Link>
        
      </Container>

      {/* pop-up menu */}
      {userMenuShow ? <UserMenu setUserMenuShow={setUserMenuShow} /> : null}
    </div>
  )
}

export default NavigationBar
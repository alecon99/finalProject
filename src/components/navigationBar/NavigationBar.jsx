import React, { useState, useEffect, useContext } from 'react'
import '../navigationBar/NavigationBar.css'
import { CartProvider } from '../../context/CartContext'

/* reactBootstrap */
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSession } from '../../middlewares/ProtectedRoutes'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import UserMenu from './userMenu/UserMenu'
import { AdminProvider } from '../../context/AdminContext'
import NavMenu from './navMenu/NavMenu'

const NavigationBar = () => {

  const { cartProducts, cartCounter, isLoading, getCartProducts } = useContext(CartProvider)
  const { adminRole, isAdmin, setAdminRole } = useContext(AdminProvider)

  const session = useSession();

  const [userMenuShow, setUserMenuShow] = useState(false)
  const [navMenuShow, setNavMenuShow] = useState(false)

  const togleUserMenuShow = () => {
    setUserMenuShow(!userMenuShow)
    setNavMenuShow(false)
  }

  const togleNavMenuShow = () => {
    setNavMenuShow(!navMenuShow)
    setUserMenuShow(false)
  }

  return (
    <div id='nav_container' className={`fixed-top ${adminRole ? 'bg-admin' : 'bg-black'}`}>
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
        <Link id='nav_logo' to={'/'} className='fs-3 text-decoration-none text-white d-md-none'>
          <div className='d-flex'>
            <div>New</div>
            <div>Life</div>
          </div>
        </Link>
        <Link id='nav_logo' to={'/'} className='font text-decoration-none text-white d-none d-md-block'>NewLife</Link>

        {/* menu button */}
        <button className='btn text-white fs-4' onClick={togleNavMenuShow}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </Container>

      {/* pop-up menu */}
      {userMenuShow ? <UserMenu setUserMenuShow={setUserMenuShow} /> : null}
      {navMenuShow ? <NavMenu setUserMenuShow={setUserMenuShow} /> : null}
    </div>
  )
}

export default NavigationBar
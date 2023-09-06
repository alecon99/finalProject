import React, { useState, useEffect} from 'react'
import '../navigationBar/NavigationBar.css'

/* reactBootstrap */
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSession } from '../../middlewares/ProtectedRoutes'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import UserMenu from './userMenu/UserMenu'

const NavigationBar = () => {

  const session = useSession();

  const [ userMenuShow, setUserMenuShow ] = useState(false)

  const togleMenuShow = ()=>{
    setUserMenuShow(!userMenuShow)
  }

  return (
    <div id='nav_container' >
        <Container className='text-white d-flex justify-content-between align-items-center'>
          {session ? 
            <div>
              <div className='green'>Welcome</div>
              <div className='d-flex'>
                <div className='fs-4'>{session.name}</div>
                <div className='fs-4 ms-1 d-none d-md-block'>{session.surname}</div>
                <button className='btn text-white' onClick={togleMenuShow}>
                  {userMenuShow? <FontAwesomeIcon icon={faChevronUp} />:<FontAwesomeIcon icon={faChevronDown} />}
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
          <Link id='nav_logo' to={'/'} className='fs-3 text-decoration-none text-white d-md-none'>
            <div className='d-flex'>
              <div>New</div>
              <div>Life</div>
            </div>
          </Link>
          <Link id='nav_logo' to={'/'} className='text-decoration-none text-white d-none d-md-block'>NewLife</Link>
          <div>menu</div>
        </Container>
        {userMenuShow? <UserMenu setUserMenuShow={setUserMenuShow}/>:null}
    </div>
    
  )
}

export default NavigationBar
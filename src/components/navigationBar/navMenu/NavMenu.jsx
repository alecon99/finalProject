import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { AdminProvider } from '../../../context/AdminContext'
import { Link } from 'react-router-dom'

const NavMenu = () => {
    const { adminRole, isAdmin, setAdminRole } = useContext(AdminProvider)

  return (
    <Container className='my-2 border-top'>
        <div className='text-white mt-3 d-flex justify-content-center'>
            <div className='mx-2 hover_link'>
                | Link |
            </div>
            <div className='mx-2 hover_link'>
                | Link |
            </div>
            <div className='mx-2 hover_link'>
                | Link |
            </div>
        </div>
        <div className={`pt-3 ${adminRole ? null: 'd-none'}`}>
            <div className='border-top text-center text-white fs-5 pt-3'>ADMIN MENU</div>
            <div className='text-white my-3 d-flex justify-content-center'>
                <Link className='mx-2 hover_link text-decoration-none text-white' to={'/addProduct'}>
                    | Manage product |
                </Link>
                <div className='mx-2 hover_link'>
                    | Manage users |
                </div>
                <div className='mx-2 hover_link'>
                    | Orders |
                </div>
            </div>
        </div>
        
    </Container>
  )
}

export default NavMenu
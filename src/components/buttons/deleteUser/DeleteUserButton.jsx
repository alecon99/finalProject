import { useContext } from 'react'

import { UsersProvider } from '../../../context/UserContext';

import { Button } from 'react-bootstrap';

const DeleteUserButton = ({ userId }) => {

  const { getAllUsers } = useContext(UsersProvider);

  const deleteUser = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/deleteUser/${userId}`, {
        method: "DELETE"
      });
      getAllUsers();
    } catch (error) {
      console.error("Failed to delete the user");
    }
  };

  return (
    <Button variant='danger' className='fw-bolder p-2' onClick={deleteUser} >Yes</Button>
  )
}

export default DeleteUserButton
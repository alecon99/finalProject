import { createContext, useState, useEffect } from "react";
import { useSession } from '../middlewares/ProtectedRoutes'

export const UsersProvider = createContext();

export const UsersContext = ({ children }) => {

    const session = useSession();

    const [ allUsers, setAllUsers ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ userCounter, setUserCounter ] = useState("");
    const [user, setUser] = useState({});

    useEffect(()=>{
        getAllUsers()
    },[])

    const getAllUsers = async ()=>{
        try {
            setIsLoading(true);
            const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users`);
            const response = await data.json();
            setUserCounter(response.counter);
            setAllUsers(response.users);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const getUserById = async () => {
        try {
            setIsLoading(true);
            const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/user/${session.id}`);
            const response = await data.json();
            setUser(response.userById);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <UsersProvider.Provider value={{ allUsers, isLoading, user, userCounter, getUserById, getAllUsers }}>
            {children}
        </UsersProvider.Provider>
    )

};
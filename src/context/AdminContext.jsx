import { createContext, useState, useEffect } from "react";
import { useSession } from '../middlewares/ProtectedRoutes'

export const AdminProvider = createContext();

export const AdminContext = ({ children }) => {

    const session = useSession();

    const [ adminRole , setAdminRole ] = useState(false)

    const isAdmin = ()=>{
        if(session){
          if(session.role === "admin"){
            setAdminRole(true)
          }
        }else{
            setAdminRole(false)
        }
    }

    useEffect(() => {
        isAdmin()
    }, [])

    return (
        <AdminProvider.Provider value={{ adminRole, setAdminRole }}>
            {children}
        </AdminProvider.Provider>
    )

};

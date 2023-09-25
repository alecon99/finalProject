import React from "react";
import { Outlet } from "react-router-dom";

import jwtDecode from "jwt-decode"
import LoginPage from "../pages/LoginPage";

const auth = ()=>{
    return JSON.parse(localStorage.getItem("userLoggedIn"));
};

export const useSession = ()=>{
    const session = auth();
    const decodedSession = session? jwtDecode(session): null;

    return decodedSession;
};

const ProtectedRoutes = ()=>{
    const isAuthorized = auth();
    const session = useSession();

    return isAuthorized ? <Outlet/> : <LoginPage/>;
};

export default ProtectedRoutes;
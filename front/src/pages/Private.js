import { Navigate } from "react-router";

function Private({redirectTo, children}){
    const isAuthenticated = localStorage.getItem('token')
    return isAuthenticated ? children  : <Navigate to={redirectTo} />
}

export default Private;
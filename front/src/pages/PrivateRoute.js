import { Navigate } from 'react-router'

const PrivateRoute = ({ children, redirectTo}) => {
    const isAuthenticated = localStorage.getItem('token') 
    return isAuthenticated ? children : <Navigate to={redirectTo} />
}

export default PrivateRoute;
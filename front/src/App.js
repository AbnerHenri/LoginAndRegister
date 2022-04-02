import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/RegisterAndLogin/Login';
import Register from './pages/RegisterAndLogin/Register';
import Admin from './pages/AdminLogged/adminLogged'
import Users from './pages/UserLogged/userLogged'
import PrivateRoute from './pages/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin' element={<Admin />} />

            <Route path='/users/:id' element={<PrivateRoute redirectTo='/login'><Users /></PrivateRoute>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;

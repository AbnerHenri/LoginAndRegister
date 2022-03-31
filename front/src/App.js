import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/RegisterAndLogin/Login';
import Register from './pages/RegisterAndLogin/Register';
import Admin from './pages/AdminLogged/adminLogged'
import Users from './pages/UserLogged/userLogged'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin' element={<Admin />} />

            <Route path='/users/:id' element={<Users />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;

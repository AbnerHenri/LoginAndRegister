import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

import Login from './pages/registerAndLogin/Login';
import Register from './pages/RegisterAndLogin/Register';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Register />} />
            <Route path='/register' element={<Login />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

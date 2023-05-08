import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../screen/Login'


function Authstack() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
export default Authstack;
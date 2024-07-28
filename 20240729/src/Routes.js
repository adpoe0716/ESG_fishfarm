import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Buy from './list/Buy';
import Calculator from './list/Calculator';
import New from './list/New';
import Measurement from './list/Measurement';
import Buy2 from './list/Buy2';
import Buy3 from './list/Buy3';
import Login from './list/Login';
import Register from './list/Register';
import Logout from './list/Logout';
import Navbar from './Navbar'; // 确保路径正确
import MapPage from './list/MapPage';
import Topices from './list/Topices';
import Test from './test/Dashboard';


function AppRoutes() {
    return (
        <BrowserRouter>
            <Navbar />  
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                {/* <Route path="/topics/1" element={<App />} /> */}
                {/* <Route path="/topics/2" element={<Topices />} /> */}
                <Route path="/buy" element={<Buy />} />
                <Route path="/new/*" element={<New />} />
                <Route path="/cal" element={<Calculator />} />
                <Route path="/measurement" element={<Measurement />} />
                <Route path="/buy2" element={<Buy2 />} />
                <Route path="/buy3" element={<Buy3 />} />
                <Route path="/map" element={<MapPage />} /> 
                {/* <Route path="/test" element={<Test/>} />  */}
                {Array.from({ length: 4 }, (_, i) => (
                    <Route key={i} path={`/topics/${i + 1}`} element={<Test num={i+1} />} />
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;

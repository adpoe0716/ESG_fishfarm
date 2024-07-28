// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './User';
import AppRoutes from './Routes';
import './Style.css';
import 'leaflet/dist/leaflet.css'; // 添加這行
import DE from './test/Dashboard';
ReactDOM.render(
    <React.StrictMode>
            {/* <DE /> */}
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

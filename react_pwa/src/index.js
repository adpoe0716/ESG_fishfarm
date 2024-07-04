import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import Buy from "./list/Buy";
import Calculator from "./list/Calculator";
import New from "./list/New";
import Measurement from "./list/Measurement";
import Window from "./Topics/Window";
import "./index.css"; // 引入样式文件
import Buy2 from "./list/Buy2";
import Buy3 from "./list/Buy3";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="navbar-container">
        <div className="navbar">
          <h1 className="navbar-title">ESG創新永續漁業管理資訊系統</h1>
          <Link to="/" className="navbar-link">
            儀表板
          </Link>
          <Link to="/Buy" className="navbar-link">
            購買平台
          </Link>
          <Link to="/New" className="navbar-link">
            新知
          </Link>
          <Link to="/Cal" className="navbar-link">
            計算機
          </Link>
          <Link to="/Measurement" className="navbar-link">
            測量
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Buy" element={<Buy />} />
        <Route path="/New/*" element={<New />} />
        <Route path="/Cal" element={<Calculator />} />
        <Route path="/Measurement" element={<Measurement />} />
        <Route path="/Buy2" element={<Buy2 />}/>
        <Route path="/Buy3" element={<Buy3 />}/> 
      </Routes>
    </BrowserRouter>
    <Window />
  </React.StrictMode>
);

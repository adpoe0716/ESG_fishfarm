import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import QA from "../word/QA";
import ESG_New from "../word/NewESG";
import SpeciesInformation from "../word/SpeciesInformation";
import Fishknowledge from "../word/Fishknowledge";
import FishNews from "../word/FishNews";
import Co2 from "../word/Co2";

export default function New() {
  const navbarContainerStyle = {
    backgroundColor: '#f8f8f8',
    padding: '10px',
    borderBottom: '2px solid #ddd',
  };

  const navbarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const navbarTitleStyle = {
    fontSize: '24px',
    marginRight: '20px',
  };

  const navbarLinkStyle = {
    textDecoration: 'none',
    color: '#333',
    marginLeft: '15px',
    fontSize: '18px',
    transition: 'color 0.3s',
  };

  const navbarLinkHoverStyle = {
    color: '#007bff',
  };

  return (
    <>
      <div style={navbarContainerStyle}>
        <div style={navbarStyle}>
          <Link to="ESG_New" style={navbarLinkStyle} onMouseOver={e => e.currentTarget.style.color = navbarLinkHoverStyle.color} onMouseOut={e => e.currentTarget.style.color = navbarLinkStyle.color}>ESG新聞</Link>
          <Link to="QA" style={navbarLinkStyle} onMouseOver={e => e.currentTarget.style.color = navbarLinkHoverStyle.color} onMouseOut={e => e.currentTarget.style.color = navbarLinkStyle.color}>QA</Link>
          <Link to="SpeciesInformation" style={navbarLinkStyle} onMouseOver={e => e.currentTarget.style.color = navbarLinkHoverStyle.color} onMouseOut={e => e.currentTarget.style.color = navbarLinkStyle.color}>物種資料</Link>
          <Link to="fishknowledge" style={navbarLinkStyle} onMouseOver={e => e.currentTarget.style.color = navbarLinkHoverStyle.color} onMouseOut={e => e.currentTarget.style.color = navbarLinkStyle.color}>魚塭的小知識</Link>
          <Link to="FishNews" style={navbarLinkStyle} onMouseOver={e => e.currentTarget.style.color = navbarLinkHoverStyle.color} onMouseOut={e => e.currentTarget.style.color = navbarLinkStyle.color}>魚塭新聞</Link>
          <Link to="Co2" style={navbarLinkStyle} onMouseOver={e => e.currentTarget.style.color = navbarLinkHoverStyle.color} onMouseOut={e => e.currentTarget.style.color = navbarLinkStyle.color}>碳的小知識</Link>
        </div>
      </div>
      <Routes>
        <Route path="ESG_New" element={<ESG_New />} />
        <Route path="QA" element={<QA />} />
        <Route path="SpeciesInformation" element={<SpeciesInformation />} />
        <Route path="fishknowledge" element={<Fishknowledge />} />
        <Route path="FishNews" element={<FishNews />} />
        <Route path="Co2" element={<Co2 />} />
      </Routes>
    </>
  );
}

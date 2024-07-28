import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './User';
import './Style.css';

function Navbar() {
    const { user, logout, isAuthenticating } = useAuth();

    if (isAuthenticating) {
        return <div>Loading...</div>;
    }

    const currentUser = user ? user.user_name : '';
    const user_fishfarm_num = user ? user.user_fishfarm_num : '';
    // console.log(user_fishfarm_num);
    return (
        <div className="navbar">
            <h1 className="navbar-title">ESG養殖漁業系統</h1>
            <div className="navbar-links">
                {!user ? (
                    <Link to="/" className="navbar-link">登入</Link>
                ) : (
                    <>
                        <Link to="/map" className="navbar-link">地圖</Link>
                        <Link to="/buy" className="navbar-link">購買平台</Link>
                        <Link to="/new" className="navbar-link">新知</Link>
                        <Link to="/cal" className="navbar-link">計算機</Link>
                        {/* <Link to="/test" className="navbar-link">test</Link> */}
                        <Link to="/measurement" className="navbar-link">測量</Link>
                        
                        <Link to="/logout" className="navbar-link" onClick={logout}>登出</Link>
                        <span className="navbar-user">目前使用者: {currentUser}</span>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;

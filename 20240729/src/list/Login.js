import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../User';
import '../Style.css';
import MapPage from './MapPage';


function Login() {
      const notify = () => toast("Wow so easy!");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/login', { name: username, pwd: password });
            if (response.data.status) {
                console.log('Login successful:', response.data);
                localStorage.setItem('token', response.data.token);
                login(response.data.token); // 傳遞 token 而不是 user
                navigate('/map');
            } else {
                toast.error("登录失败: " + response.data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error("登录异常，请稍后重试");
        }
    };

    return (
        <div className="container">
            <div className="main-content">
                <div className="login-box">
                    <h2>歡迎! 請登入~</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="帳號"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="密碼"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="button" onClick={handleLogin}>Login</button>
                    </form>
                    <div className="footer">
                        <a href="/forgot-password">忘記密碼</a>
                        <a href="/register">註冊</a>
                    </div>
                </div>
            </div>
            {/* <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> */}
        </div>
    );
}

export default Login;

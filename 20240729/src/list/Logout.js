import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../User';

function Logout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        // 清除 token 並登出
        localStorage.removeItem('token');
        logout();

        // 顯示登出成功的消息
        toast.success("登出成功");

        // 在2秒後導向到登入頁面
        const timer = setTimeout(() => {
            navigate('/');
        }, 2000);

        // 清理計時器
        return () => clearTimeout(timer);
    }, [logout, navigate]);

    return (
        <div>
            {/* 渲染 ToastContainer 以顯示登出成功的消息 */}
            {/* <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> */}
        </div>
    );
}

export default Logout;

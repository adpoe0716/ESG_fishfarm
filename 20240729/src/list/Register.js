import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [userName, setUserName] = useState('');
    const [userAccount, setUserAccount] = useState(''); // 通常是電子郵件
    const [userPassword, setUserPassword] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userOption, setUserOption] = useState('2'); // 預設為一般使用者

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            user_name: userName,
            user_email: userAccount,
            user_pwd: userPassword,
            user_phone: userPhone,
            user_address: userAddress,
            user_option: userOption
        };

        try {
            const response = await axios.post('http://localhost:3000/api/register', data);
            if(response.data.success) {
                console.log('Registration successful:', response.data);
                // 可以在這裡處理跳轉到登入頁面或顯示註冊成功消息
            } else {
                console.log('Registration failed:', response.data.message);
                // 可以在這裡處理顯示錯誤消息
            }
        } catch (error) {
            console.error('Registration error:', error);
            // 可以在這裡處理顯示錯誤消息
        }
    };

    return (
        <div>
            <h2>註冊</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>使用者名稱:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div>
                    <label>電子郵件:</label>
                    <input
                        type="text"
                        value={userAccount}
                        onChange={(e) => setUserAccount(e.target.value)}
                    />
                </div>
                <div>
                    <label>密碼:</label>
                    <input
                        type="password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>電話:</label>
                    <input
                        type="text"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label>地址:</label>
                    <input
                        type="text"
                        value={userAddress}
                        onChange={(e) => setUserAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label>選項:</label>
                    <select value={userOption} onChange={(e) => setUserOption(e.target.value)}>
                        <option value="0">魚塭業者</option>
                        <option value="1">一般使用者</option>
                    </select>
                </div>
                <button type="submit">註冊</button>
            </form>
        </div>
    );
}

export default Register;

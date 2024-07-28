import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
                setUser(null);
            } else {
                setUser(decodedToken);
            }
        }
        setIsAuthenticating(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticating }}>
            {children}
        </AuthContext.Provider>
    );
};

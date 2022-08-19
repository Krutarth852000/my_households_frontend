import React, { useState, createContext, useEffect } from 'react';
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const decodedUser = jwt_decode(localStorage.getItem('token'));
            setUser(decodedUser)
        }
    }, []);
    
    const logout = () => {
        setUser({ token: undefined });
        localStorage.removeItem("token");
        window.location.href = "/";
    }
    
    return <AuthContext.Provider value={{user, logout}} >
        {children}
    </AuthContext.Provider>
}
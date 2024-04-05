// use-auth.js

import { createContext, useContext, useState, useMemo } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to provide authentication functionality
export const useAuth = () => {
    return useContext(AuthContext);
}

// AuthProvider wraps your entire app to provide authentication context
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');

    // Other authentication-related functions (login, logout, etc.) go here

    const register = async (formValues) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/auth/register`, { method: 'POST', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
        const data = await response.json();
        setUser({...data})

    }

    const login = async (formValues) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/auth/login`, { method: 'POST', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
        const data = await response.json();
        setUser({...data})
    }
    const logout = () => setUser(null);

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
            register,
        }), [user]
    );
    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}


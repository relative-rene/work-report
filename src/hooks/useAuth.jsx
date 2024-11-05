// use-auth.js

import { createContext, useContext, useState, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

// Create a context for authenticatfion
const AuthContext = createContext();

// Custom hook to provide authentication functionality
export const useAuth = () => {
    return useContext(AuthContext);
}


// AuthProvider wraps your entire app to provide authentication context
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [storedUser, setStoredUser] = useLocalStorage('storedUser');

    // Other authentication-related functions (login, logout, etc.) go here

    const register = async (formValues) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/auth/register_client`, { method: 'POST', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
        const data = await response.json();
        setUser({ ...data });

        return response.status < 300;
    }

    const login = async (formValues) => {
        let response;
        try {
            response = await fetch(`${process.env.REACT_APP_SERVER}/auth/login`, { method: 'POST', body: JSON.stringify(formValues), headers: { "Content-Type": "application/json" } });
            const data = await response.json();
            setUser(data);
            setStoredUser(data);
            return data;
        } catch (error) {
            console.error('error', error);
            return null;
        }
    }
    const logout = async () => {
        localStorage.clear();
        setUser(null);
    }

    const reloadUser = async (user) => {
        console.log('reloadUser')
        if (!user && storedUser) {
            console.log('storedUser', storedUser);
            setUser(storedUser);
            return storedUser;
        } else {
            console.log('user', user);
            return user;
        }
    }

    const value = useMemo(
        () => ({
            user,
            storedUser,
            login,
            logout,
            register,
            reloadUser
        }), [user, login, reloadUser]
    );
    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}


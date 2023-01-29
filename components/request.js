import axios from 'axios';
import { createContext } from 'react';
import { toast } from "react-toastify";
import jwtDecode from 'jwt-decode';


// export const savedToken = localStorage.getItem("token")

export const AuthContext = createContext({
    token: null,
    setToken: () => { }
});

export const isTokenValid = (token) => {
    console.log('token>> ',token);
    
    if (token === undefined || token === null)
        return false;

    if (jwtDecode(token).exp < Date.now() / 1000) {
        return false;
    } else {
        return true;
    }
}

export const toastSuccess = (msg) => toast.success(msg, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "light",
});

export const toastError = (msg) => toast.error(msg, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "light",
});




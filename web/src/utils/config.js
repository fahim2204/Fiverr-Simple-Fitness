import axios from "axios"
import { toast } from "react-toastify";
import jwtDecode from 'jwt-decode'; 


export const apiUrl = "http://localhost:8080"
export const savedToken = localStorage.getItem("token")

export const notify = (msg) =>
toast(msg, {
  position: "bottom-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "light",
});

export const axiosAuth = axios.create({
    baseURL:apiUrl,
    headers:{
        Accept: `application/json`,
        token:savedToken,
    }
})

export const isTokenValid = () =>{
  const token = localStorage.getItem("token");
    if(jwtDecode(token).exp < Date.now() / 1000){
        return false;
    }else{
        return true;
    }

}
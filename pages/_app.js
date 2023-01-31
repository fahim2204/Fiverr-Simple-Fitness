import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'flowbite'
import { ToastContainer } from "react-toastify";

import { useEffect, useState } from 'react'
import { AuthContext,isTokenValid } from '../components/request'
import { getCookie, setCookie, getCookies } from 'cookies-next';



export default function App({ Component, pageProps }) {
  const [token, setToken] = useState(getCookie('token'));

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <ToastContainer />
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

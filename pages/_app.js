import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'flowbite'
import { ToastContainer } from "react-toastify";

import { useEffect, useState } from 'react'
import { AuthContext,isTokenValid } from '../components/request'
import { getCookie, setCookie, getCookies } from 'cookies-next';
import Script from 'next/script';




export default function App({ Component, pageProps }) {
  const [token, setToken] = useState(getCookie('token'));

  useEffect(() => {
    import("flowbite");
  }, []);

{/* <Script
  src="https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"
  strategy="beforeInteractive"
/> */}
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <ToastContainer />
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

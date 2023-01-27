import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'flowbite'
import { useEffect, useLayoutEffect, useState } from 'react'
import { AuthContext,isTokenValid } from '../components/request'
import { getCookie, setCookie, getCookies } from 'cookies-next';



export default function App({ Component, pageProps }) {
  const [token, setToken] = useState(getCookie('token'));
  // If Token is available
  
  // useEffect(() => {
  //   console.log("Checking Cookie");
  //   if (getCookie('token')) {
  //     console.log("Token is available");
  //     setToken(getCookie('token'))
  //   }
  // }, [])

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useState, useContext, useEffect } from "react";
import { loginValidate } from "../lib/validate";
import axios from "axios";
import { getCookie, setCookie, getCookies  } from 'cookies-next';
import { AuthContext, toastError,toastSuccess } from "../components/request";


const Login = () => {
  const { token, setToken } = useContext(AuthContext);
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  const router = useRouter();
  const [serverError, setServerError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    setServerError(null);
    setIsLoginLoading(true)
    axios.post(`api/login`, values).then((x) => {
      setIsLoginLoading(false)
      toastSuccess('Login Success!!');
      setToken(x.data.token);
      setCookie("token", x.data.token,{maxAge:60*60*2})
      router.push("/")
    }).catch((err) => {
      setIsLoginLoading(false)
      if (err.response?.status === 401) {
        setServerError('Username or password incorrect!!');
      }
      else {
        toastError('Something went wrong!!');
      }
    })
  }

  return (
    <>
      <Head>
        <title>LogByte - Login</title>
      </Head>
      <main>
        <ToastContainer />
        <div className="flex items-center min-h-screen bg-gray-100 justify-center">
          <div className="overflow-hidden rounded-lg shadow-lg sm:max-w-sm md:mx-auto w-full">
            <div className="p-6 bg-white md:flex-1">
              <div className="hover:scale-110 transition-all duration-300">
                <Link href={"/"}>
                  <img
                    className="mx-auto mb-3 h-16 object-contain"
                    src="/img/logo-light.jpg"
                    alt="logo"
                  />
                </Link>
              </div>
              <h3 className="mb-3 text-sm font-semibold text-gray-700 text-center">
                Welcome Back! Please Login
              </h3>
              <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-3 px-4">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="username" className="text-sm font-semibold text-gray-500">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`px-3 py-1 transition duration-300 border ${formik.errors.username && formik.touched.username
                      ? "border-rose-600"
                      : "border-gray-300"
                      } rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200`}
                    {...formik.getFieldProps("username")}
                  />
                  <div className="text-rose-600 text-xs mt-1">
                    {formik.errors.username && formik.touched.username && (
                      <div>{formik.errors.username}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-500">
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`px-3 py-1 transition duration-300 border ${formik.errors.password && formik.touched.password
                      ? "border-rose-600"
                      : "border-gray-300"
                      } rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200`}
                    {...formik.getFieldProps("password")}
                  />
                  <div className="text-rose-600 text-xs mt-1">
                    {formik.errors.password && formik.touched.password && (
                      <div>{formik.errors.password}</div>
                    )}
                  </div>
                  <div className="text-slate-500 text-xs text-end hover:text-sky-500 cursor-pointer transition-colors duration-300">
                    <Link href={`/forget-pass`}> Forget password?</Link>
                  </div>
                </div>
                {serverError && (
                  <div className="text-rose-600 text-sm text-center">{serverError}</div>
                )}

                <div className="pt-1">
                  {isLoginLoading ?
                    <div className="flex justify-center mb-4"><PropagateLoader color="#1C64F2" /></div> : <button
                      type="submit"
                      className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                    >
                      Log in
                    </button>}
                </div>
                <h3 className="mb-3 mt-1 text-sm font-semibold text-gray-500 text-center">
                  Not Registered?{" "}
                  <Link href={"/register"} className="hover:text-sky-500 cursor-pointer transition-colors duration-300">
                    Register
                  </Link>
                </h3>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Login;

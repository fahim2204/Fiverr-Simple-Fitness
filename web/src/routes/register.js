//Import React Library
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

// Import CSS
// Import JS

// Import Components
import { MainTitle } from "../utils/variables";
import { Images } from "../utils/images";
import { apiUrl } from "../utils/config";

export default function Register() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({});
  const [registerError, setRegisterError] = useState([]);

  const notify = () =>
    toast("Registration Succesfull!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

  const checkError = (field) => {
    let errmsg;
    registerError.forEach((x) => {
      if (x.param === field) errmsg = x.msg;
    });
    return errmsg;
  };

  const doRegisterRequest = () => {
    axios
      .post(`${apiUrl}/register`, registerData)
      .then(() => {
        setRegisterError([]);
        setRegisterData({
          fullName: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        notify();
        navigate("/login");
      })
      .catch((e) => {
        e.response.data
          ? setRegisterError(e.response.data)
          : console.log("Error>> ", e);
      });
  };

  const handleRegisterData = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>{MainTitle} - Register</title>
      </Helmet>
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 bg-light shadow-cam-primary d-flex flex-column align-items-center rounded-3">
          <Link to={`/`}>
            <img
              className="p-1 rounded-circle border shadow mt-3 mb-4"
              src={Images.Logo}
              alt="logo"
              height={120}
              width={120}
            />
          </Link>
          <p className="text-black mb-4">Welcome! Please Register</p>
          <div className="mb-3 w-100 px-4">
            <input
              className={`form-control py-2 ${
                checkError("fullName") && "is-invalid"
              }`}
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={registerData["fullName"]}
              onChange={(e) => handleRegisterData(e)}
            />
            <div className="invalid-feedback">{checkError("fullName")}</div>
          </div>
          <div className="mb-3 w-100 px-4">
            <input
              className={`form-control py-2 ${
                checkError("username") && "is-invalid"
              }`}
              type="text"
              name="username"
              placeholder="Username"
              value={registerData["username"]}
              onChange={(e) => handleRegisterData(e)}
            />
            <div className="invalid-feedback">{checkError("username")}</div>
          </div>
          <div className="mb-3 w-100 px-4">
            <input
              className={`form-control py-2 ${
                checkError("password") && "is-invalid"
              }`}
              type="password"
              name="password"
              value={registerData["password"]}
              placeholder="Password"
              onChange={(e) => handleRegisterData(e)}
            />
            <div className="invalid-feedback">{checkError("password")}</div>
          </div>
          <div className="mb-3 w-100 px-4">
            <input
              className={`form-control py-2 ${
                checkError("confirmPassword") && "is-invalid"
              }`}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerData["confirmPassword"]}
              onChange={(e) => handleRegisterData(e)}
            />
            <div className="invalid-feedback">
              {checkError("confirmPassword")}
            </div>
          </div>
          <div className="text-center">
            <button
              className="btn-cam-primary mt-3"
              onClick={doRegisterRequest}
            >
              Register
            </button>
          </div>
          <p className="text-muted my-3">
            Already Registered?{" "}
            <Link className="hov-cl-cam-primary" to={`/login`}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

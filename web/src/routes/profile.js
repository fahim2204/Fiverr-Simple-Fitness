//Import React Library
import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// Import CSS

// Import Components
import { MainTitle } from "../utils/variables";
import { Images } from "../utils/images";
import { apiUrl, axiosAuth } from "../utils/config";
import { BiCamera } from "react-icons/bi";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Profile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [profileUpdateError, setProfileUpdateError] = useState(null);
  const [token, setToken] = useState();
  const [selectedFile, setSelectedFile] = useState("");
  const imageInputRef = useRef(null);
  const [imgBase64, setImgBase64] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const imgToBase64 = (image) => {
    let base64String = "";
    var reader = new FileReader();
    reader.onload = function () {
      base64String = reader.result;
      setImgBase64(base64String);
      setProfileData({ ...profileData, profilePic: base64String });
    };
    reader.readAsDataURL(image);
  };
  useEffect(() => {
    if (!selectedFile) {
      setProfileImage(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setProfileImage(objectUrl);
    imgToBase64(selectedFile);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleProfileData = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const notify = (msg) =>
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

  const doUpdateProfileRequest = () => {
    axios
      .put(`${apiUrl}/profile`, profileData, {
        headers: {
          token: token,
        },
      })
      .then((x) => {
        notify(x.data.message);
        setProfileUpdateError(null)
      })
      .catch((err) => {
        console.log("ERR>>", err);
        if (err.response.data) setProfileUpdateError(err.response.data);
        else notify("Something wrong!!!");
      });
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`${apiUrl}/profile`, {
          headers: {
            token: token,
          },
        })
        .then((x) => {
          setProfileData(x.data);
        })
        .catch(() => {
          localStorage.clear();
          setTimeout(() => {
            navigate("/login");
          }, 200);
          notify("Please Login again!!");
        });
    }
  }, [token]);

  return (
    <>
      <Helmet>
        <title>{MainTitle} - Profile</title>
      </Helmet>
      <Header />
      <div className="row">
        <div className="col-12 col-sm-3">
          <div className="fs-5 mb-3 text-center fw-bold">My Profile</div>
          {/* Section--> Profile Image Upload */}
          <div className="text-center profile-img">
            <img
              className="p-1 rounded-circle border shadow mt-3 mb-4"
              src={
                profileData.profilePic
                  ? profileData.profilePic
                  : profileImage
                  ? profileImage
                  : `/img/nophoto.jpg`
              }
              alt="logo"
              height={120}
              width={120}
            />
            <BiCamera
              className="cam-icn fs-3 cl-cam-primary"
              onClick={() => imageInputRef.current.click()}
            />
            <input
              type="file"
              name="image"
              placeholder="url"
              ref={imageInputRef}
              accept="image/png, image/gif, image/jpeg, image/jpg"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>
        </div>
        <div className="col-12 col-sm-9">
          {(!profileData.status || profileData.status === 0) && (
            <div className="d-flex justify-content-start">
              <div className="alert alert-warning py-1 mb-0" role="alert">
                Please update your full profile to access all the features!!!
              </div>
            </div>
          )}
          <div className="col-12 col-md-10 col-lg-8 col-xl-7 mt-0 mt-sm-4 pt-4">
            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label" htmlFor="fullName">
                Full Name:
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control py-2"
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={profileData?.fullName || ""}
                  onChange={(e) => {
                    handleProfileData(e);
                  }}
                />
              </div>
            </div>
            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label" htmlFor="occupation">
                Occupation:
              </label>
              <div className="col-sm-9">
              <select
                  className="form-select"
                  name="occupation"
                  id="occupation"
                  value={profileData?.occupation || ""}
                  onChange={(e) => {
                    handleProfileData(e);
                  }}
                >
                  <option value="">Select Occupation</option>
                  <option value="Farmers">Farmers</option>
                  <option value="Wildlife Experts">Wildlife Experts</option>
                  <option value="Students">Students</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label" htmlFor="gender">
                Gender:
              </label>
              <div className="col-sm-9">
                <select
                  className="form-select"
                  name="gender"
                  id="gender"
                  value={profileData?.gender || ""}
                  onChange={(e) => {
                    handleProfileData(e);
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label" htmlFor="email">
                Email:
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control py-2"
                  type="text"
                  name="email"
                  id="email"
                  value={profileData?.email || ""}
                  onChange={(e) => {
                    handleProfileData(e);
                  }}
                />
              </div>
            </div>
            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label" htmlFor="country">
                Country:
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control py-2"
                  type="text"
                  name="country"
                  id="country"
                  value={profileData?.country || ""}
                  onChange={(e) => {
                    handleProfileData(e);
                  }}
                />
              </div>
            </div>
            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label" htmlFor="city">
                City:
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control py-2"
                  type="text"
                  name="city"
                  id="city"
                  value={profileData?.city || ""}
                  onChange={(e) => {
                    handleProfileData(e);
                  }}
                />
              </div>
            </div>
            <div className="mb-4 row">
              <label className="col-sm-3 col-form-label" htmlFor="password">
                Password:
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control py-2"
                  type="password"
                  name="password"
                  id="password"
                  value={profileData?.password || ""}
                  onChange={(e) => {
                    handleProfileData(e);
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-9">
                {profileUpdateError && (
                  <div className="alert alert-danger mb-0 p-1" role="alert">
                    <ul className="mb-0">
                      {profileUpdateError.map((item, index) => {
                        return <li key={index}>{item.msg}</li>;
                      })}
                    </ul>
                  </div>
                )}
                <div className="text-center mb-3">
                  <button
                    className="btn-cam-primary my-4"
                    onClick={doUpdateProfileRequest}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

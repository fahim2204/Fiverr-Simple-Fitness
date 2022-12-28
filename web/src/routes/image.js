//Import React Library
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { saveAs } from "file-saver";

// Import CSS

// Import Components
import Header from "../components/header";
import Footer from "../components/footer";
import { BiCamera } from "react-icons/bi";
import { MainTitle } from "../utils/variables";
import { apiUrl, notify } from "../utils/config";
import axios from "axios";

export default function Image() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState("");
  const imageInputRef = useRef(null);
  const [imgBase64, setImgBase64] = useState("");
  const [image, setImage] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [resultData, setResultData] = useState({});
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const gotoResult = () => {
    if (
      !resultData.uploadedImage ||
      !resultData.resultantImage ||
      !resultData.categoryName ||
      resultData.categoryName === ""
    ) {
      notify("Please select Image & Category!!");
      // console.log(resultData)
    } else {
      if (token) {
        axios
          .get(`${apiUrl}/profile/status`, {
            headers: {
              token: token,
            },
          })
          .then(() => {
            setIsImageSelected(true);
          })
          .catch(() => {
            setTimeout(() => {
              navigate("/profile");
            }, 200);
            notify("Please Update Full Profile!!");
          });
      } else {
        setTimeout(() => {
          navigate("/login");
        }, 200);
        notify("Please Login!!");
      }
    }
  };
  const handleImageData = (e) => {
    setResultData({ ...resultData, categoryName: e.target.value });
  };

  const imgToBase64 = (image) => {
    let base64String = "";
    var reader = new FileReader();
    reader.onload = function () {
      base64String = reader.result;
      setImgBase64(base64String);
      setResultData({
        ...resultData,
        uploadedImage: base64String,
        resultantImage: base64String,
      });
    };
    reader.readAsDataURL(image);
  };
  useEffect(() => {
    if (!selectedFile) {
      setImage(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    console.log("SelectedFile>>", selectedFile);
    setImage(objectUrl);
    imgToBase64(selectedFile);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const saveToMyGallery = (togo) => {
    // 1-For Save to My Gallery
    // 2-For Save to My Gallery & Public
    // 3-For Save to Archive
    if (togo === 1) {
      axios
        .post(
          `${apiUrl}/gallery`,
          { ...resultData, isPublic: 1 },
          {
            headers: {
              token: token,
            },
          }
        )
        .then((x) => {
          notify("Saved to Public gallery!!");
          navigate("/gallery")
        })
        .catch((err) => {
          console.log("ERR>>", err);
          notify("Something wrong!!!");
        });
    } else if (togo === 2) {
      axios
        .post(
          `${apiUrl}/gallery`,
          { ...resultData, isPublic: 0 },
          {
            headers: {
              token: token,
            },
          }
        )
        .then((x) => {
          notify("Saved to Your gallery!!");
          navigate("/mygallery")
        })
        .catch((err) => {
          console.log("ERR>>", err);
          notify("Something wrong!!!");
        });
    } else {
      axios
        .post(
          `${apiUrl}/gallery`,
          { ...resultData, isArchived: 1 },
          {
            headers: {
              token: token,
            },
          }
        )
        .then(() => {
          notify("Gallery is archived!!");
          navigate("/archive")
        })
        .catch((err) => {
          console.log("ERR>>", err);
          notify("Something wrong!!!");
        });
    }
  }

  const downloadImg = () => {
    saveAs(resultData.resultantImage, `image-${Date.now()}.jpg`);
  };

  return (
    <>
      <Helmet>
        <title>{MainTitle} - Image</title>
      </Helmet>
      <Header />
      {isImageSelected ? (
        <div className="my-auto">
          <div className="d-flex flex-column align-items-center">
            <div className="compare-img rounded shadow-cam-primary d-flex align-items-center cursor-pointer mb-3">
              <ReactCompareSlider
                itemOne={
                  <ReactCompareSliderImage
                    src={resultData.uploadedImage}
                    alt="Image one"
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={resultData.resultantImage}
                    alt="Image two"
                  />
                }
              />
            </div>
            <div className="my-4">
              <div className="d-flex justify-content-center mb-3">
                <button
                  className="btn-cam-primary mx-3"
                  onClick={() => saveToMyGallery(3)}
                >
                  Delete Image
                </button>
                <button className="btn-cam-primary mx-3" onClick={downloadImg}>Download Image</button>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn-cam-primary mx-3"
                  onClick={() => saveToMyGallery(2)}
                >
                  Save to My Gallery
                </button>
                <button
                  className="btn-cam-primary mx-3"
                  onClick={() => saveToMyGallery(1)}
                >
                  Save to Public Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-auto">
          <div className="d-flex flex-column align-items-center">
            <div
              className="img-up-con rounded shadow-cam-primary cursor-pointer mb-3"
              onClick={() => imageInputRef.current.click()}
            >
              {!selectedFile && (
                <div className="d-flex flex-column align-items-center bg-cam-dark-light p-5 rounded">
                  <BiCamera className="display-3" />
                  <div className="fs-6">Upload a Image</div>
                </div>
              )}
              {selectedFile && (
                <>
                  <img
                    className="rounded"
                    src={image}
                    alt="Uploaded"
                    height={300}
                  />
                  <span className="hov-img-ic">
                    <BiCamera className="display-3 cl-cam-primary" />
                  </span>
                </>
              )}
              <input
                type="file"
                name="image"
                placeholder="url"
                ref={imageInputRef}
                accept="image/png, image/gif, image/jpeg, image/jpg"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </div>
            <div className="my-2">
              <select
                className="form-select"
                name="categoryName"
                value={resultData?.categoryName}
                onChange={(e) => {
                  handleImageData(e);
                }}
              >
                <option value="">Select a category</option>
                <option value="Amphibian">Amphibian</option>
                <option value="Aquatic">Aquatic</option>
                <option value="Flying">Flying</option>
                <option value="Terrestrial">Terrestrial</option>
              </select>
            </div>
            <div className="my-3">
              <div className="d-flex mb-3">
                {/* <button className="btn-cam-primary mx-3">Delete Image</button> */}
                <button onClick={gotoResult} className="btn-cam-primary mx-3">
                  Show Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

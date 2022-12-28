//Import React Library
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { BallTriangle } from "react-loader-spinner";

// Import CSS
// Import JS

// Import Components
import { apiUrl, notify } from "../utils/config";
import Header from "../components/header";
import Footer from "../components/footer";

export default function ArchiveGallery() {
  const [localToken, setLocalToken] = useState();
  const [galleryImage, setGalleryImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLocalToken(localStorage.getItem("token"));
  }, []);

  const getArchiveGallery = () => {
    axios
      .get(`${apiUrl}/gallery/archive`, {
        headers: {
          token: localToken,
        },
      })
      .then((x) => {
        setIsLoading(false);
        setGalleryImage(x.data);
      })
      .catch(() => {
        setIsLoading(true);
        notify("Can't Fetch Images!!");
      });
  };

  useEffect(() => {
    if (localToken) getArchiveGallery();
  }, [localToken]);
  return (
    <>
      <Header />
      {isLoading ? (
        <div className="d-flex justify-content-center mt-5">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        <div className="row g-1 gx-3 mt-2">
          <div className="col-12 col-md-6 md-2">
            {galleryImage.map((item, index) => {
              return (
                <>
                  {(index + 1) % 2 === 1 && (
                    <div className="bg-cam-dark-light2 p-1 rounded shadow-sm mb-3">
                      <img
                        className="img-fluid w-50"
                        src={item.uploadedImage}
                        alt="gallery"
                      />
                      <img
                        className="img-fluid w-50"
                        src={item.resultantImage}
                        alt="gallery"
                      />
                    </div>
                  )}
                </>
              );
            })}
          </div>
          <div className="col-12 col-md-6 md-2">
            {galleryImage.map((item, index) => {
              return (
                <>
                  {(index + 1) % 2 === 0 && (
                    <div className="bg-cam-dark-light2 p-1 rounded shadow-sm mb-3">
                      <img
                        className="img-fluid w-50"
                        src={item.uploadedImage}
                        alt="gallery"
                      />
                      <img
                        className="img-fluid w-50"
                        src={item.resultantImage}
                        alt="gallery"
                      />
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

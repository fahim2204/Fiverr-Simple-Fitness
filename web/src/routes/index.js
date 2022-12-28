//Import React Library
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { toast } from "react-toastify";
import { BallTriangle } from "react-loader-spinner";
import { Pagination, Autoplay, EffectFade, Lazy } from "swiper";

// Import CSS
// Import JS

// Import Components
import { apiUrl, notify } from "../utils/config";
import Header from "../components/header";
import Footer from "../components/footer";
import { MainTitle } from "../utils/variables";
import { BiCamera } from "react-icons/bi";
import { Images } from "../utils/images";

export default function Index() {
  const [homeImage, setHomeImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [localToken, setLocalToken] = useState();
  const navigate = useNavigate();

  const gotoDetectImg = () => {
    if (localToken) {
      navigate("/image");
    }else{
      navigate("/login");
    }
  };
  useEffect(() => {
    setLocalToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/gallery`)
      .then((x) => {
        setIsLoading(false);
        setHomeImage(x.data);
      })
      .catch(() => {
        setIsLoading(true);
        notify("Can't Fetch Images!!");
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>{MainTitle} - Home</title>
      </Helmet>
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
        <div className="row g-2 g-lg-4">
          {[...new Set(homeImage.map((x) => x.categoryName))].map(
            (cat, catindex) => {
              return (
                <>
                  <div
                    key={catindex + 500}
                    className="col-12 col-md-6 mb-3 mb-md-0 slider-g1"
                  >
                    <Swiper
                      slidesPerView={1}
                      autoHeight={true}
                      loop={true}
                      lazy={true}
                      effect={"fade"}
                      autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                      }}
                      modules={[EffectFade, Autoplay, Lazy]}
                      className="mySwiper"
                    >
                      {homeImage
                        .filter((item) => item.categoryName === cat)
                        .map((item, index) => {
                          return (
                            <>
                              <SwiperSlide>
                                <img
                                  className="img-fluid"
                                  src={item.uploadedImage}
                                  alt="gallery"
                                />
                              </SwiperSlide>
                              <SwiperSlide>
                                <img
                                  className="img-fluid"
                                  src={item.resultantImage}
                                  alt="gallery"
                                />
                              </SwiperSlide>
                            </>
                          );
                        })}
                    </Swiper>
                    <span className="slider-title">{cat}</span>
                  </div>
                </>
              );
            }
          )}
        </div>
      )}
      <div className="my-5">
        <div className="text-center">
          <div onClick={gotoDetectImg} className="btn-cam-primary">
            <BiCamera className="fs-4 mx-2" />
            <span>Show Results</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

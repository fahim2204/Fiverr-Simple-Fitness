//Import React Library
// Import CSS
// Import JS

// Import Components
import Header from "../components/header";
import Footer from "../components/footer";
import { FaFacebookSquare, FaLinkedin, FaPhoneSquareAlt } from "react-icons/fa";
import { MdMail } from "react-icons/md";

export default function Contact() {
  return (
    <>
      <Header />
      <div className="pt-2 px-4 rounded mt-2 text-center">
        <span className="fs-3">MEET OUR TEAM</span>
      </div>
      <hr />
      <div className="row mt-3 mb-5">
        <div className="col-6 col-md-4 col-lg-3 px-3 mb-4 mb-lg-0">
          <div className="bg-cam-dark-light rounded h-100 shadow-cam-primary">
            <img className="img-fluid rounded-top" src="/img/av-male.png" alt="avatar" />
            <div className="d-flex flex-column align-items-center px-1">
              <div className="fs-5 mt-1 text-center">TARIQ NAEEM</div>
              <div className="fs-6 mb-1">
                <small>FOUNDER</small>
              </div>
              <div className="d-flex justify-content-center w-100 mb-3 fs-5">
                <a href="mailto:naeemtariq@gmail.com">
                  <MdMail />
                </a>
                <a href="#">
                  <FaLinkedin className="mx-3" />
                </a>
                <a href="#">
                  <FaPhoneSquareAlt />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3 px-3 mb-4 mb-lg-0">
          <div className="bg-cam-dark-light rounded h-100 shadow-cam-primary">
            <img className="img-fluid rounded-top" src="/img/av-female.png" alt="avatar" />
            <div className="d-flex flex-column align-items-center px-1">
              <div className="fs-5 mt-1 text-center">RIDA SYED</div>
              <div className="fs-6 mb-1">
                <small>CO-FOUNDER & CEO</small>
              </div>
              <div className="d-flex justify-content-center w-100 mb-3 fs-5">
                <a href="mailto:ridafatima475@gmail.com">
                  <MdMail />
                </a>
                <a href="#">
                  <FaLinkedin className="mx-3" />
                </a>
                <a href="#">
                  <FaPhoneSquareAlt />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3 px-3 mb-4 mb-lg-0">
          <div className="bg-cam-dark-light rounded h-100 shadow-cam-primary">
            <img className="img-fluid rounded-top" src="/img/av-female.png" alt="avatar" />
            <div className="d-flex flex-column align-items-center px-1">
              <div className="fs-5 mt-1 text-center">ESHAL NAYYAB CHAUDHRY</div>
              <div className="fs-6 mb-1">
                <small>CO-FOUNDER & CEO</small>
              </div>
              <div className="d-flex justify-content-center w-100 mb-3 fs-5">
                <a href="mailto:eshalch53@gmail.com">
                  <MdMail />
                </a>
                <a href="#">
                  <FaLinkedin className="mx-3" />
                </a>
                <a href="#">
                  <FaPhoneSquareAlt />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3 px-3 mb-4 mb-lg-0">
          <div className="bg-cam-dark-light rounded h-100 shadow-cam-primary">
            <img className="img-fluid rounded-top" src="/img/av-female.png" alt="avatar" />
            <div className="d-flex flex-column align-items-center px-1">
              <div className="fs-5 mt-1 text-center">TOOBA RAZA</div>
              <div className="fs-6 mb-1">
                <small>CO-FOUNDER & CEO</small>
              </div>
              <div className="d-flex justify-content-center w-100 mb-3 fs-5">
                <a href="mailto:toobaraza811@gmail.com">
                  <MdMail />
                </a>
                <a href="#">
                  <FaLinkedin className="mx-3" />
                </a>
                <a href="#">
                  <FaPhoneSquareAlt />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

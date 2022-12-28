//Import React Library
import axios from "axios";
import moment from "moment";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";

// Import CSS
// Import JS

// Import Components
import { apiUrl, notify } from "../utils/config";
import Header from "../components/header";
import Footer from "../components/footer";
import { MdEmail } from "react-icons/md";

export default function Helpline() {
  const [allFaq, setAllFaq] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllFaq = () => {
    axios
      .get(`${apiUrl}/faq`)
      .then((x) => {
        setIsLoading(false);
        setAllFaq(x.data);
      })
      .catch(() => {
        setIsLoading(true);
        notify("Can't Fetch FAQs!!");
      });
  };
  useEffect(() => {
    getAllFaq();
  }, []);

  return (
    <>
      <Header />
      <div className="bg-cam-dark-light py-3 px-4 rounded my-3">
        <span className="fs-4">Hi, How can we help?</span>
      </div>
      <div className="fs-4 my-3">Top Questions</div>
      {isLoading ? (
        <div className="d-flex justify-content-center mt-5">
          <Bars
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
        <div className="px-0 mb-4">
          <div className="accordion" id="accordionExample">
            {allFaq.map((item, index) => {
              return (
                <div key={index} className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${index}`}
                    >
                      {/* Question */}
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {/* Answer */}
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="d-flex flex-column align-items-center mt-5">
        <div className="fs-3 fw-bold mb-3">Still Need Help?</div>
        <div className="fs-5 mb-2">You Can Contact Us On:</div>
        <div className="d-flex flex-column mt-2 mb-5">
          <div className="d-flex align-items-center mb-2">
            <MdEmail className="me-2" />
            <a href="mailto:ridafatima475@gmail.com">ridafatima475@gmail.com</a>
          </div>
          <div className="d-flex align-items-center mb-2">
            <MdEmail className="me-2" />
            <a href="mailto:eshalch53@gmail.com">eshalch53@gmail.com</a>
          </div>
          <div className="d-flex align-items-center mb-2">
            <MdEmail className="me-2" />
            <a href="mailto:toobaraza811@gmail.com">toobaraza811@gmail.com</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

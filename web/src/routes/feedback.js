//Import React Library
import axios from "axios";
import moment from "moment";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { BallTriangle } from "react-loader-spinner";

// Import CSS
// Import JS

// Import Components
import { apiUrl, notify, isTokenValid } from "../utils/config";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  TbMoodCry,
  TbMoodConfuzed,
  TbMoodEmpty,
  TbMoodHappy,
  TbMoodCrazyHappy,
} from "react-icons/tb";

export default function Feedback() {
  const [localToken, setLocalToken] = useState();
  const [allFeedback, setAllFeedback] = useState([]);
  const [feedbackData, setFeedbackData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    setLocalToken(localStorage.getItem("token"));
    // isTokenValid()?notify("Valid"):notify("Not")
  }, []);

  const getAllFeedback = () => {
    axios
      .get(`${apiUrl}/feedback`)
      .then((x) => {
        setIsLoading(false);
        setAllFeedback(x.data);
      })
      .catch(() => {
        setIsLoading(true);
        notify("Can't Fetch Feedbacks!!");
      });
  };
  useEffect(() => {
    getAllFeedback();
  }, []);

  const handleFeedChange = (e) => {
    setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
  };
  const handleFeedbackSubmit = () => {
    if (
      !feedbackData["opinion"] ||
      !feedbackData["category"] ||
      !feedbackData["feedText"]
    ) {
      setIsError(["Please Fill All the Fields"]);
    } else {
      setIsError(null);
      axios
        .post(`${apiUrl}/feedback`, feedbackData, {
          headers: {
            token: localToken,
          },
        })
        .then((x) => {
          notify(x.data.message);
          setFeedbackData({feedText:"",opinion:"",category:""});
          getAllFeedback();
        })
        .catch((err) => {
          console.log("ERR>>", err);
          if(err.response.status===401)
          notify("Please Login First!!")
        });
    }
  };

  return (
    <>
      <Header />
      <div className="col-12 col-md-7 mx-auto">
        <div className="text-center my-3">
          <span className="fs-4">YOUR FEEDBACK</span>
        </div>
        <hr />
        <p className="fs-5 text-center">
          We would like your feedback to improve our website.
        </p>
        <p className="fs-6 text-center mb-1">
          What is your opinion of this page?
        </p>
        <div className="d-flex justify-content-center align-items-center">
          <input
            type="radio"
            name="opinion"
            id="opinion-1"
            value="1"
            {...feedbackData.opinion===1 && `checked`}
            className="op-radio"
            onChange={(e) => handleFeedChange(e)}
          />
          <label htmlFor="opinion-1" className="op-emo emo-1" title="Very Bad">
            <TbMoodCry />
          </label>
          <input
            type="radio"
            name="opinion"
            id="opinion-2"
            value="2"
            className="op-radio"
            onChange={(e) => handleFeedChange(e)}
          />
          <label htmlFor="opinion-2" className="op-emo emo-2" title="Bad">
            <TbMoodConfuzed />
          </label>
          <input
            type="radio"
            name="opinion"
            id="opinion-3"
            value="3"
            className="op-radio"
            onChange={(e) => handleFeedChange(e)}
          />
          <label htmlFor="opinion-3" className="op-emo emo-3" title="Neutral">
            <TbMoodEmpty />
          </label>
          <input
            type="radio"
            name="opinion"
            id="opinion-4"
            value="4"
            className="op-radio"
            onChange={(e) => handleFeedChange(e)}
          />
          <label htmlFor="opinion-4" className="op-emo emo-4" title="Good">
            <TbMoodHappy />
          </label>
          <input
            type="radio"
            name="opinion"
            id="opinion-5"
            value="5"
            className="op-radio"
            onChange={(e) => handleFeedChange(e)}
          />
          <label htmlFor="opinion-5" className="op-emo emo-5" title="Excellent">
            <TbMoodCrazyHappy />
          </label>
        </div>
        <hr />
        <p className="fs-6 mb-2 text-center">
          Please select your feedback category below:
        </p>
        <div className="d-flex justify-content-center align-items-center">
          <input
            type="radio"
            name="category"
            id="feed-cat-1"
            value="1"
            className="cat-radio"
            onChange={(e) => handleFeedChange(e)}
          />
          <label
            htmlFor="feed-cat-1"
            className="feed-emo feed-emo-1"
            title="Very Bad"
          >
            Suggestion
          </label>
          <input
            type="radio"
            name="category"
            id="feed-cat-2"
            value="2"
            className="cat-radio"
            onChange={(e) => handleFeedChange(e)}
          />
          <label
            htmlFor="feed-cat-2"
            className="feed-emo feed-emo-2"
            title="Bad"
          >
            Something Wrong
          </label>
          <input
            type="radio"
            name="category"
            id="feed-cat-3"
            value="3"
            className="cat-radio"
            onChange={(e) => handleFeedChange(e)}
          />
          <label
            htmlFor="feed-cat-3"
            className="feed-emo feed-emo-3"
            title="Neutral"
          >
            Complement
          </label>
        </div>
        <hr />
        <div className="d-flex justify-content-center">
          <div className="mb-3 w-75">
            <label htmlFor="feedtext" className="form-label">
              Please leave your feedback below:
            </label>
            <textarea
              className="form-control"
              name="feedText"
              rows="3"
              value={feedbackData["feedText"]}
              placeholder="Leave your feedback here..."
              onChange={(e) => handleFeedChange(e)}
            ></textarea>
          </div>
        </div>
        {isError && (
          <div className="d-flex justify-content-center">
            <div className="col-12 col-md-8 alert alert-danger py-0 mb-0" role="alert">
              {isError.map((item) => {
                return <small>{item}</small>;
              })}
            </div>
          </div>
        )}
        <div className="text-center pt-3">
          <button
            className="btn-cam-primary mb-5 px-5"
            onClick={handleFeedbackSubmit}
          >
            Submit
          </button>
        </div>
        <div className="fs-4">User's Feedback</div>
        <hr />
        {allFeedback.map((item, index) => {
          return (
            <div
              key={index}
              className="border rounded p-3 bg-cam-dark-light mb-3"
            >
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="fs-5 me-2">
                    {item.user?.fullName ? item.user?.fullName : "Unknown"}
                  </div>
                  <div className="fs-6">
                    <small>{moment(item.createdAt).format("DD-MM-YYYY")}</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  {item.opinion === 1 ? (
                    <TbMoodCry className="me-2 fs-4" />
                  ) : item.opinion === 2 ? (
                    <TbMoodConfuzed className="me-2 fs-4" />
                  ) : item.opinion === 3 ? (
                    <TbMoodEmpty className="me-2 fs-4" />
                  ) : item.opinion === 4 ? (
                    <TbMoodHappy className="me-2 fs-4" />
                  ) : (
                    <TbMoodCrazyHappy className="me-2 fs-4" />
                  )}
                  <div className="border border-danger py-0 px-1 d-flex rounded">
                    {item.category === 1
                      ? "Suggestion"
                      : item.category === 2
                      ? "Something Wrong"
                      : "Complement"}
                  </div>
                </div>
              </div>
              <div className="ps-2 pt-2">{item.feedText}</div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

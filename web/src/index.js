//Import React Library
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";

// Import CSS
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/grid";
import "swiper/css/lazy";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.css";
import "./element.css";
import "./index.css";

// Import JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// Import Routes Pages
import Index from "./routes";
import Login from "./routes/login";
import Register from "./routes/register";
import About from "./routes/about";
import Gallery from "./routes/gallery";
import Helpline from "./routes/helpline";
import Contact from "./routes/contact";
import Image from "./routes/image";
import Profile from "./routes/profile";
import Feedback from "./routes/feedback";
import OwnGallery from "./routes/owngallery";
import ArchiveGallery from "./routes/archivegallery";

// All Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/image",
    element: <Image />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/mygallery",
    element: <OwnGallery />,
  },
  {
    path: "/archive",
    element: <ArchiveGallery />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
  },
  {
    path: "/helpline",
    element: <Helpline />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

//Render all the Components
ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <div className="container-fluid">
    <ToastContainer />
      <div className="container-lg">
        <div className="vh-100 d-flex flex-column"><RouterProvider router={router}></RouterProvider></div>
      </div>
    </div>
  </HelmetProvider>
);

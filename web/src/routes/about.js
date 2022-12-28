//Import React Library
// Import CSS 
// Import JS

// Import Components 
import Header from "../components/header"
import Footer from "../components/footer"

export default function About() {
  return (
    <>
      <Header />
      {/* <div className="bg-cam-dark-light py-3 px-4 rounded my-3 text-center">
        <span className="fs-2">VISION & MISSION</span>
      </div> */}
      <div className="row mt-4 d-flex justify-content-between">
        <div className="col-12 col-md-5 mb-5 px-3">
          <img className="img-fluid" src="/img/vision.png" alt="" />
        </div>
        <div className="col-12 col-md-6 mb-5">
          <div className="display-5 text-start fnt-cam-1 mb-3">
            Our Vision
          </div>
          <div className="fs-5 text-center shadow-cam-primary bg-cam-dark-light p-2 rounded">
            To be the leading choice for our customer with Consistent quality.
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="display-5 text-end fnt-cam-1 mb-3">
            Our Mission
          </div>
          <div className="fs-5 text-center shadow-cam-primary bg-cam-dark-light p-2 rounded">
            Providing an Insight to your Vision.
          </div>
        </div>
        <div className="col-12 col-md-5 mb-4 px-3">
          <img className="img-fluid" src="/img/mission.png" alt="" />
        </div>
        <div className="display-6 fnt-cam-1 text-center mb-2 mt-3">OVERVIEW</div>
        <hr/>
        <p className="fs-6 text-justify p-3 rounded-4">
          We aim to propose a business plan on a much useful and practical product service named as “Improving Camouflaged Object Detection (<b>COD</b>) using Machine Learning Algorithm” which will target the objects that tend to hide in their surroundings and apparently seems invisible. It will target the objects that often deceives the naked eye. We offer a user-friendly web application based platform for our valuable customers. The prominent feature that distinguishes our camouflaged object detector service from normal objection detector tools is the fact it will be able to recognize the hidden object that have been embedded in the surrounding. However, it is where the complexity comes in as it is comparatively easier to detect normal objects through computer vision, but hidden objects are much difficult to mask out of the background. Understanding COD has not only scientific value in itself, but it also important for applications in many fundamental fields, such as computer vision (e.g., for search-and-rescue work, or rare species discovery), medicine (e.g., polyp segmentation, lung infection segmentation), agriculture (e.g., locust detection to prevent invasion), and art (e.g., recreational art). The high intrinsic similarities between the targets and non-targets make COD far more challenging than traditional object segmentation and detection.
        </p>

      </div>
      <Footer />
    </>
  )
}

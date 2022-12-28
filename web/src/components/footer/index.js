import { Images } from "../../utils/images";

export default function Footer() {
  return (
    <>
        <footer className="mt-auto">
          <hr className="m-0"/>
          <div className="d-flex justify-content-center align-items-center position-relative py-4">
            <p className="m-0 ">Copyright &#169; {new Date().getFullYear()} ERT Swerei Technologies</p>
            <img className="position-absolute end-0" src={Images.LogoFoot} alt="Logo" height={50}/>
            </div>
        </footer>
    </>
  );
}

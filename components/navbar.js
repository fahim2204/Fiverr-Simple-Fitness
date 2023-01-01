import Link from "next/link";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  return (
    <>
      <nav className="border-b w-full sticky top-0 z-50 px-6">
        <div className="sm:max-w-6xl md:mx-auto py-2 flex justify-between">
          <div className="hover:scale-110 transition-all duration-300">
            <Link href={"/"}>
              <img
                className="h-12 object-contain"
                src="/img/logo-light.jpg"
                alt="logo"
              />
            </Link>
          </div>
          <div className="space-x-2 flex items-center">
            <button className="flex items-center border border-sf-green-600 rounded-sm p-1 text-sf-green-600 hover:bg-sf-green-600 hover:text-white transition duration-300">
              <span className="text-sm mr-1">Logout</span>
              <FiLogOut /> 
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;

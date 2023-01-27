import Link from "next/link";
import { MdDevicesOther } from "react-icons/md";
import { VscGraphLine, VscTable } from "react-icons/vsc";
import { TbLogout } from "react-icons/tb";
import { useRouter } from "next/router";
import { useContext } from "react";
import { getCookie, setCookie, getCookies, deleteCookie } from "cookies-next";
import { AuthContext, isTokenValid } from "./request";


const Sidebar = () => {
  const { token, setToken } = useContext(AuthContext);
  const router = useRouter();
  const doLogout = () => {
    deleteCookie('token');
    setToken(null)
    router.push("login");
  };

  return (
    <>
      <div className="flex flex-col shadow rounded-xl overflow-hidden">
        <div className="hover:scale-110 transition-all duration-300 my-2">
          <Link href={"/"}>
            <img
              className="mx-auto my-2 h-14 object-contain"
              src="/img/logo-light.jpg"
              alt="logo"
            />
          </Link>
        </div>
        <ul className="mt-2">
          <li>
            <Link href={"/"}>
              <div
                className={`flex items-center px-3 rounded py-2 hover:bg-sf-green-300 transition-all duration-300 ${
                  router.route === "/" ? "bg-sf-green-600 text-white" : ""
                }`}
              >
                <MdDevicesOther className="mr-3 text-lg" />
                <span className="font-semibold">Dashboard</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href={"/graph"}>
              <div
                className={`flex items-center px-3 rounded py-2 hover:bg-sf-green-300 transition-all duration-300 ${
                  router.route === "/graph" ? "bg-sf-green-600 text-white" : ""
                }`}
              >
                <VscGraphLine className="mr-3 text-lg" />
                <span className="font-semibold">Graph View</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href={"/table"}>
              <div
                className={`flex items-center px-3 rounded py-2 hover:bg-sf-green-300 transition-all duration-300 ${
                  router.route === "/table" ? "bg-sf-green-600 text-white" : ""
                }`}
              >
                <VscTable className="mr-3 text-lg" />
                <span className="font-semibold">Table View</span>
              </div>
            </Link>
          </li>
          <li className="border-t border-sf-green-300 mt-16">
            <div
              onClick={doLogout}
              className="flex items-center px-3 rounded cursor-pointer hover:text-white py-2 hover:bg-sf-green-400 transition-all duration-300"
            >
              <TbLogout className="mr-3 text-lg" />
              <span className="font-semibold">Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Sidebar;

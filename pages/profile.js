import Head from "next/head";
import Link from "next/link";
import Footer from "../components/footer";
import { BiArrowBack, BiCamera } from "react-icons/bi";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const imageInputRef = useRef(null);

  return (
    <>
      <Head>
      </Head>
      <main>
        <div className="sm:max-w-4xl mx-auto mt-6 grid grid-cols-14 gap-8 mb-5">
          <div className="col-span-4">
            <div className="flex flex-col items-center border rounded-xl shadow px-8 py-4">
              <div className="profile-img flex justify-center relative">
                <img
                  className="rounded-full w-3/4 drop-shadow"
                  src="https://studentportallaravel.fahimfaisal.net/upload/fahim.jpg"
                  alt="profile"
                />
                <BiCamera
                  className="absolute bottom-0 right-8 text-3xl bg-slate-200 rounded-full p-1 shadow cursor-pointer hover:bg-slate-800 hover:text-white transition duration-500"
                  onClick={() => imageInputRef.current.click()}
                />
                <input
                  type="file"
                  name="image"
                  className="hidden"
                  placeholder="url"
                  ref={imageInputRef}
                  accept="image/png, image/gif, image/jpeg, image/jpg"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>

              <h3 className="text-slate-600 font-semibold mt-2">@{session?.username}</h3>
              <h3 className="text-xl font-semibold mb-3 mt-1 text-slate-800 drop-shadow">
                {session?.fullName}
              </h3>
            </div>
          </div>
          <div className="col-span-10">
            <div className="flex flex-col border rounded-xl shadow px-8 py-4">
              <h3 className="text-center text-xl underline font-semibold drop-shadow-xl mb-6">
                Profile View/Update
              </h3>

              <form action="#" className="flex flex-col space-y-3">
                <div className="flex flex-col space-y-1">
                  <label for="email" className="text-sm font-semibold text-gray-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    autofocus
                    className="px-3 py-1 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  <label for="email" className="text-sm font-semibold text-gray-500">
                    Email address
                  </label>
                  <input
                    type="country"
                    id="country"
                    name="country"
                    autofocus
                    className="px-3 py-1 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  <label for="email" className="text-sm font-semibold text-gray-500">
                    Country
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autofocus
                    className="px-3 py-1 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <label for="password" className="text-sm font-semibold text-gray-500">
                      Gender
                    </label>
                  </div>
                  <select
                    className="px-3 py-1 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    name="gender"
                    id="gender"
                    value={""}
                    onChange={(e) => {
                      handleProfileData(e);
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {/* <input
                    type="password"
                    id="password"
                    className="px-3 py-1 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                  /> */}
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 mt-6 mb-3 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

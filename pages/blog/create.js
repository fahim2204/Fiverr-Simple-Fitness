import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [serverError, setServerError] = useState(null);



  async function onSubmit(values) {
    axios
      .post(`/api/user`, values)
      .then((x) => {
        setServerError([]);
        notify("Registration success!!");
        router.push("/login");
      })
      .catch((e) => {
        if (e.response.data.errors) {
          setServerError(e.response.data.errors);
        } else {
          console.log("Error>> ", e);
        }
      });
  }

  return (
    <>
      <Head>
        <title>OulYas - Blog</title>
      </Head>
      <main>
        <Navbar />
        <div className="sm:max-w-lg mx-auto mt-6 mb-5">
          {/* <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-2">
              <label for="email" className="text-sm font-semibold text-gray-500">
                Post Title
              </label>
              <input
                type="text"
                id="postTitle"
                name="postTitle"
                className={`px-3 py-1 transition duration-300 borderborder-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200`}
                onChange
                {...formik.getFieldProps("postTitle")}
              />
              <div className="text-rose-600 text-xs mt-1">
                {formik.errors.postTitle && formik.touched.postTitle && (
                  <div>{formik.errors.postTitle}</div>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label for="postDetails" className="text-sm font-semibold text-gray-500">
                Post Details
              </label>
              <textarea
                type="postDetails"
                id="postDetails"
                name="postDetails"
                className={`px-3 py-1 transition duration-300 border ${
                  formik.errors.postDetails && formik.touched.postDetails
                    ? "border-rose-600"
                    : "border-gray-300"
                } rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200`}
                {...formik.getFieldProps("postDetails")}
                rows="4"
                placeholder="Write your thoughts here..."
              ></textarea>
              <div className="text-rose-600 text-xs mt-1">
                {formik.errors.postDetails && formik.touched.postDetails && (
                  <div>{formik.errors.postDetails}</div>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <label for="postImage" className="text-sm font-semibold text-gray-500">
                  postImage
                </label>
              </div>

              <input type="file" accept="image/*" {...field} />
              {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
              <div className="text-rose-600 text-xs mt-1">
                {formik.errors.postImage && formik.touched.postImage && (
                  <div>{formik.errors.postImage}</div>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <ul className="list-disc m-0 flex flex-col ml-6">
                {serverError &&
                  serverError.map((err) => {
                    return (
                      <>
                        <li className="text-rose-600 leading-5 text-sm">
                          {err.instancePath.replace("/", "")} {err.message}
                        </li>
                      </>
                    );
                  })}
              </ul>
            </div>
            <div>
              <button
                type="submit"
                className="mt-3 w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Create Post
              </button>
            </div>
          </form> */}
        </div>
        <Footer />
      </main>
    </>
  );
}

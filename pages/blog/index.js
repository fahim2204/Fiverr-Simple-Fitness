import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { BiArrowBack } from "react-icons/bi";

export default function Home() {
  return (
    <>
      <Head>
        <title>OulYas - Blog</title>
      </Head>
      <main>
        <Navbar />
        <div className='sm:max-w-6xl mx-auto mt-6 grid grid-cols-14 gap-8 mb-5'>
          <div className="col-span-10">
            <div className="flex flex-col border rounded-xl shadow px-8 py-4">
              <h3 className='text-3xl text-center py-1 font-semibold leading-10 drop-shadow-2xl mt-2'>Architectural Engineering Wonders of the modern era for your Inspiration</h3>
              <div className="flex my-2 items-center justify-center drop-shadow-md">
                <img className='rounded-full w-12 mr-3' src="https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=640&q=75&fit=clip&auto=format" alt="profile" />
                <div className='flex flex-col'>
                  <div className="text-slate-800 font-medium"><Link href={"/profile"}>Mario Sanchez</Link></div>
                  <div className="text-slate-400 text-sm">October 21, 2022</div>
                </div>
              </div>
              <img className='w-auto shadow mb-1 mt-5 mx-8' src="https://cdn.sanity.io/images/cijrdavx/production/05951a0ec1a6ffc54f615ab160649e92fea982d0-800x764.png?rect=0,0,800,468&w=640&q=75&fit=clip&auto=format" alt="blog" height={"250"} />
              <div className="desc mt-4 text-justify">
                Reinvention often comes in spurts, after a long period of silence. Just as modern architecture recently enjoyed a comeback, brand architecture, a field with well-established principles for decades, is back in the limelight.<br />

                Simply understood, brand architecture is the art and science of structuring the portfolio to meet your strategic goals, defining the brand number, scope, and relationships needed to compete. Just as Modern Architecture prioritized function, a Brand Architecture is only as good as it is well-suited for the purpose it strives to achieve. Given the disruption observed today across industries and segments, it’s no wonder that companies are considering structural rather than topical solutions to the challenges they face.<br />

                Yet the context in which brand architecture decisions are being made has changed. Gone are the days of “competitive strategy”, with the military-inspired view of competition as a zero-sum game, where market share needs to be stolen from competitors, often in a street-by-street battle to win over each individual segment. The type of brand architecture required to win in this game demanded a dogged focus on each segment, and a sniper-like collection of individual brands sharply focused on each one. While there was always a place for a variety of architectures — see Joachimsthaler’s brand relationship spectrum — houses of brands were favored, as it enabled segment-by-segment competition and risk protection. P&G was the king of houses of brands, slicing and dicing the market not just by products and demographics, but also by psychographics, price range, buying patterns or attitudes. In B2B, houses of brands were omnipresent, with a product-driven logic that led to branding new features meant to provide short-term competitive advantage.<br />

                In today’s day and age, companies like Google or Amazon do not pursue growth through incremental market share gains; rather, they focus on understanding their customers’ needs and creating entirely new markets to answer them. Creating a house of brands for these markets would be folly — not only would each brand need to be created from scratch, increasing the already significant investment, but the new category itself often needs to be explained to consumers, compounding the cost.
              </div>
              <div className="flex justify-center mt-4">
                <Link href={"/"}>
                  <div className='flex items-center text-blue-600 hover:underline font-semibold'>
                    <BiArrowBack className='mr-2' />
                    View all posts
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col border rounded-xl shadow px-8 py-4 mt-4">
              <h3 className='font-semibold text-2xl mb-3'>Comments:</h3>
              <div className="flex mb-3">
                <input
                  type="text"
                  id="comment"
                  name="comment"
                  autofocus
                  className="p-3 transition duration-300 border flex-grow border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
                <button className='bg-green-700 hover:bg-green-600 transition duration-300 font-semibold text-white rounded-md px-3 ml-4'>Comment</button>
              </div>
              <h3 className='mb-3 text-xl font-semibold'>Please <Link className='text-blue-600 hover:text-blue-500 transition duration-300 hover:underline' href={"/login"}>login </Link>to comment</h3>
              <div className="flex flex-col">
                <div className='border py-2 px-4 rounded-md mb-2 shadow'>
                  <div className="flex my-2 items-center drop-shadow-md">
                    <img className='rounded-full w-9 mr-3' src="https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=640&q=75&fit=clip&auto=format" alt="profile" />
                    <div className='flex flex-col'>
                      <div className="text-slate-800 text-sm font-medium"><Link href={"/profile"}>Mario Sanchez</Link></div>
                      <div className="text-slate-400 text-xs">October 21, 2022</div>
                    </div>
                  </div>
                  <h3 className='text-justify'>In today’s day and age, companies like Google or Amazon do not pursue growth through incremental market share gains; rather, they focus on understanding.</h3>
                </div>
                <div className='border py-2 px-4 rounded-md mb-2 shadow'>
                  <div className="flex my-2 items-center drop-shadow-md">
                    <img className='rounded-full w-9 mr-3' src="https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=640&q=75&fit=clip&auto=format" alt="profile" />
                    <div className='flex flex-col'>
                      <div className="text-slate-800 text-sm font-medium"><Link href={"/profile"}>Mario Sanchez</Link></div>
                      <div className="text-slate-400 text-xs">October 21, 2022</div>
                    </div>
                  </div>
                  <h3 className='text-justify'>In today’s day and age, companies like Google or Amazon do not pursue growth through incremental market share gains; rather, they focus on understanding.</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col">
            <h3 className='text-xl font-bold mb-3'>Recent Post</h3>
              <div className='mb-3'>
                <Link href={"/blog"}>
                  <div className="flex space-x-2 hover:bg-slate-100 transition duration-300 rounded">
                    <img className='h-24 aspect-square object-cover object-center rounded' src="https://cdn.sanity.io/images/cijrdavx/production/b7d2fa6d0b250bd1e0c601645319db4cde42a01e-3958x5937.jpg?w=1920&q=75&fit=clip&auto=format" alt="item" />
                    <div className="flex flex-col">
                      <h2 className='leading-5 font-medium line-clamp-3'>This Bread Pudding Will Give You All the Fall Feels</h2>
                      <h3 className='text-sm text-slate-600 mt-1'>October 19, 2022</h3>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='mb-3'>
                <Link href={"/blog"}>
                  <div className="flex space-x-2 hover:bg-slate-100 transition duration-300 rounded">
                    <img className='h-24 aspect-square object-cover object-center rounded' src="https://cdn.sanity.io/images/cijrdavx/production/b7d2fa6d0b250bd1e0c601645319db4cde42a01e-3958x5937.jpg?w=1920&q=75&fit=clip&auto=format" alt="item" />
                    <div className="flex flex-col">
                      <h2 className='leading-5 font-medium line-clamp-3'>This Bread Pudding Will Give You All the Fall Feels</h2>
                      <h3 className='text-sm text-slate-600 mt-1'>October 19, 2022</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

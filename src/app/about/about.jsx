import Link from "next/link";
import React from "react";

export const about = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 flex justify-evenly flex-col items-center">
      <div className="w-full min-h-screen sm:w-3/4 sm:min-h-[300px]">
        <div className="flex items-center justify-center m-10">
          <img
            src="https://images-ext-1.discordapp.net/external/b88xtpwXUOtoZ2uXbYlvcGwFkQZ_IMzTfx6KC9oiuf0/https/res.cloudinary.com/dtwiog6cy/image/upload/v1715277145/Proyecto%2520FInal/ltpvsdwg7xfds7fzm1ho.png?format=webp&quality=lossless&width=705&height=258"
            alt=""
            className=" w-56 sm:w-64 xl:w-72 ShadowEffect z-0"
          />
        </div>
        <h3 className="text-center text-gray-900 text-2xl font-semibold">
          Your door to reliable solutions.
        </h3>
        <p className="text-center text-gray-900 text-xl m-7 font-semibold ">
          Rin|Door is an intuitive and secure platform, our company makes it
          easy to find and hire professionals in different fields, from home
          repairs to remodeling projects. Our unique approach allows users to
          post their needs and receive offers from qualified professionals,
          while ensuring safe and satisfactory transactions for both parties.
          With Rin|Door, opening the door to excellence in service has never
          been so simple.
        </p>
      </div>

      <div className="w-3/4 bg-gray-900 h-[450px] md:h-96 sm:h-80 m-10  flex flex-col items-center justify-center rounded-xl shadow-gray-900 shadow-xl">
        <h3 className="text-center text-yellow-300 text-2xl p-2 font-semibold">
          Client
        </h3>
        <p className="text-white text-lg md:text-xl text-justify p-4 ">
          Register for free and access a wide range of services to meet your
          needs. From home repairs to renovation projects, Rin|Door is your
          gateway to trusted professionals. Post your service request today and
          start receiving personalized offers from experts in your area. Open
          the door to reliable solutions with Rin|Door!
        </p>
        <div className="w-full flex justify-center">
          <button
            type="button"
            className="text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-[100px] md:w-[150px] text-center"
          >
            Registrarme
          </button>
        </div>
      </div>

      <div className="w-3/4 bg-gray-900 h-[450px] md:h-96 sm:h-80 m-10  flex flex-col items-center justify-center rounded-xl shadow-gray-900 shadow-lg">
        <h3 className="text-center text-yellow-300 text-2xl p-2 font-semibold">
          Professional
        </h3>
        <p className="text-white  text-lg md:text-xl text-justify p-4">
          Sign up now and get exclusive access to job opportunities in your
          area. Become part of our community of qualified professionals and
          access clients looking for your skills. Build your reputation and
          close profitable deals with Rin|Door. Open the door to professional
          success with us!
        </p>
        <div className="w-full flex justify-center">
          <Link href="/home">
            <button
              type="button"
              className="text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-[100px] md:w-[150px] text-center"
            >
              Subscribe
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default about;

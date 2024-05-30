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
          Donde los profesionales te buscan a ti
        </h3>
        <p className="text-center text-gray-900 text-xl m-7 font-semibold ">
          Rin|Door is an intuitive and secure platform. Our company facilitates
          the search and hiring of professionals in different fields, from home
          repairs to construction projects remodeling. Our unique approach
          allows users to post your needs and receive offers from qualified
          professionals, ensuring safe and satisfactory transactions for both
          parties. With Rin|Door, opening the door to service excellence has
          never been so simple.
        </p>
      </div>

      <div className="w-3/4  min-h-[450px] md:min-h-80 sm:h-80   flex flex-col items-center justify-center rounded-xl ">
        <h3 className="text-center text-gray-900 text-2xl p-2 font-semibold">
          Client
        </h3>
        <p className="text-gray-800 text-lg md:text-xl text-center p-4 ">
          At Rin|Door, customers can register for free and create jobs where
          professionals can apply. The users They have the freedom to choose
          from a variety of experts qualified to carry out your projects, always
          ensuring a Reliable and quality service. Discover how Rin|Door makes
          it easier connection with trusted professionals for all your needs!
        </p>
      </div>

      <div className="w-3/4  min-h-[450px] md:min-h-80   flex flex-col items-center justify-center rounded-xl ">
        <h3 className="text-center text-gray-900 text-2xl p-2 font-semibold">
          Professionals
        </h3>
        <p className="text-gray-800  text-lg md:text-xl text-center p-4">
          At Rin|Door, professionals can subscribe monthly or annually at an
          affordable price. Benefits include the ability to apply for jobs
          posted by clients and, if they are chosen, a direct chat with
          customers is enabled to facilitate communication and project
          coordination. Furthermore, each work has a specific location, allowing
          users to professionals see how close you are to them. Take advantage
          of this opportunity to expand your business and connect with customers
          who They need your services!
        </p>
      </div>
    </div>
  );
};

export default about;

"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

export const forbidden = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 flex justify-evenly flex-col items-center">
      <div className="bg-gray-800  w-1/2 h-72 items-center flex rounded justify-around lg:flex-row flex-col">
        <img
          src="https://images-ext-1.discordapp.net/external/b88xtpwXUOtoZ2uXbYlvcGwFkQZ_IMzTfx6KC9oiuf0/https/res.cloudinary.com/dtwiog6cy/image/upload/v1715277145/Proyecto%2520FInal/ltpvsdwg7xfds7fzm1ho.png?format=webp&quality=lossless&width=705&height=258"
          alt=""
          className=" w-56 sm:w-64 xl:w-72 ShadowEffect z-0"
        />
        <div className="lg:w-0.5 lg:h-5/6 w-5/6 h-0.5 bg-gray-400 rounded"></div>
        <div className="flex flex-col">
          <p className=" text-2xl text-yellow-500 fontSize ">
            {" "}
            Parece que no estas logeado!
          </p>
          <div className="justify-around w-full flex my-5">
            <Link href="/">
              <button
                type="button"
                className="mr-10  h-7 inline-block m-4 rounded bg-yellow-300 px-3 pb-1 pt-1.5 text-xs font-medium uppercase text-gray-900  ease-in-out hover:bg-yellow-500  "
                onClick={console.log("asumare")}
              >
                Volver
              </button>
            </Link>
            <button
              type="button"
              className="mr-10  h-7 inline-block m-4 rounded bg-yellow-300 px-3 pb-1 pt-1.5 text-xs font-medium uppercase text-gray-900  ease-in-out hover:bg-yellow-500  "
              onClick={() => {
                signIn();
              }}
            >
              iniciar sesion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forbidden;

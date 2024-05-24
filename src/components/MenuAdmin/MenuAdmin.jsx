import React from "react";

import Link from "next/link";

export const MenuAdmin = () => {
  return (
    <div className="w-1/2 h-[50px] bg-gray-500 rounded-b-2xl shadow-gray-500 flex justify-center items-center ">
      <h1 className="text-xl text-center m-5 font-bold text-gray-300 uppercase  tracking-widest">
        Panel|Admin
      </h1>
      <div className="w-full  bg-gray-500 flex  items-center justify-evenly ">
        <Link href="/admin">
          <button className="text-gray-900 font-bold text-center xl:text-2xl  capitalize duration-500  hover:text-white ">
            {" "}
            admin
          </button>
        </Link>
        <Link href="/admin/users">
          <button className="text-gray-900 font-bold text-center xl:text-2xl  capitalize duration-500  hover:text-white ">
            {" "}
            users
          </button>
        </Link>

        <Link href="/admin/posts">
          <button className="text-gray-900 font-bold text-center xl:text-2xl  capitalize duration-500  hover:text-white ">
            {" "}
            posts
          </button>
        </Link>

        <Link href="/admin/categories">
          <button className="text-gray-900 font-bold text-center xl:text-2xl  capitalize duration-500  hover:text-white ">
            {" "}
            categories
          </button>
        </Link>
      </div>
    </div>
  );
};

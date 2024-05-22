import React from "react";
import Link from "next/link";
import Image from "next/image";
import usersImg from "../../assets/users.svg";
import PostImg from "../../assets/post-add.svg";
import categoriesImg from "../../assets/collapse-categories.svg";

const Admin = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 flex justify-evenly flex-col items-center ">
      <div className="w-1/3 h-[450px] bg-gray-900 rounded-2xl shadow-gray-500 shadow-xl">
        <h1 className="text-4xl text-center m-5 font-bold text-gray-300 uppercase  tracking-widest">
          Panel|Admin
        </h1>
        <div className="w-full h-[400px] bg-gray-500 flex flex-col items-center justify-evenly rounded-3xl">
          <div className="w-3/4 flex  bg-gray-300 p-3 rounded-2xl shadow-gray-800 shadow-lg ">
            <div className="w-1/4 flex justify-center items-center ">
              <Image src={usersImg} alt="" className="xl:w-8 mr-2" />{" "}
            </div>
            <div className="w-3/4 h-full  flex items-center">
              <Link href="/admin/users">
                <button className="text-gray-700 font-bold text-center xl:text-2xl  capitalize duration-500  hover:text-gray-950 ">
                  {" "}
                  users
                </button>
              </Link>
            </div>
          </div>
          <div className="w-3/4 flex  bg-gray-300 p-3 rounded-2xl shadow-gray-800 shadow-lg ">
            <div className="w-1/4 flex justify-center items-center ">
              <Image src={PostImg} alt="" className="xl:w-8 mr-2" />{" "}
            </div>
            <div className="w-3/4 h-full  flex items-center">
              <Link href="/admin/posts">
                <button className="text-gray-700 font-bold text-center xl:text-2xl  capitalize duration-500  hover:text-gray-950 ">
                  {" "}
                  posts
                </button>
              </Link>
            </div>
          </div>
          <div className="w-3/4 flex  bg-gray-300 p-3 rounded-2xl shadow-gray-800 shadow-lg ">
            <div className="w-1/4 flex justify-center items-center ">
              <Image src={categoriesImg} alt="" className="xl:w-8 mr-2" />{" "}
            </div>
            <div className="w-3/4 h-full  flex items-center">
              <Link href="/admin/categories">
                <button className="text-gray-700 font-bold text-center xl:text-2xl  capitalize duration-500  hover:text-gray-950 ">
                  {" "}
                  categories
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Admin;

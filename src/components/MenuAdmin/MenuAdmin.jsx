"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import openImg from "../../assets/caret-down-svgrepo-com.svg";
import closeImg from "../../assets/caret-up-svgrepo-com.svg";

export const MenuAdmin = () => {
  const [burger, setBurger] = useState(false);

  const handleBurger = () => {
    setBurger(!burger);
    console.log("funciona");
  };

  return (
    <>
      {" "}
      <div className="hidden w-3/4  h-[50px] bg-gray-500 rounded-b-2xl shadow-gray-500 lg:flex justify-center items-center ">
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
          <Link href="/admin/subscriptions">
            <button className="text-gray-900 font-bold text-center xl:text-2xl  capitalize duration-500  hover:text-white ">
              {" "}
              Subscriptions
            </button>
          </Link>
        </div>
      </div>
      {burger === false ? (
        <button
          onClick={handleBurger}
          className="w-full h-[50px] bg-gray-500  hover:bg-gray-800 hover:text-yellow-500 text-xl text-center  font-bold text-gray-300 uppercase  tracking-widest  lg:hidden flex  justify-around items-center"
        >
          Panel|Admin <Image src={openImg} alt="" className="w-10" />
        </button>
      ) : (
        <button
          onClick={handleBurger}
          className="w-full h-[50px] bg-gray-500  hover:bg-gray-800 hover:text-yellow-500 text-xl text-center  font-bold text-gray-300 uppercase  tracking-widest  lg:hidden flex  justify-around items-center"
        >
          Close <Image src={closeImg} alt="" className="w-10" />
        </button>
      )}
      {burger === true ? (
        <div className="w-full min-h-[300px] bg-gray-950 flex flex-col  items-center justify-evenly absolute mt-12 z-20 lg:hidden">
          <Link href="/admin">
            <button className="text-white font-bold text-center xl:text-2xl  capitalize duration-500  hover:text-yellow-500 ">
              {" "}
              admin
            </button>
          </Link>
          <Link href="/admin/users">
            <button className="text-white font-bold text-center xl:text-2xl  capitalize duration-500  hover:text-yellow-500 ">
              {" "}
              users
            </button>
          </Link>

          <Link href="/admin/posts">
            <button className="text-white font-bold text-center xl:text-2xl  capitalize duration-500  hover:text-yellow-500 ">
              {" "}
              posts
            </button>
          </Link>

          <Link href="/admin/categories">
            <button className="text-white font-bold text-center xl:text-2xl  capitalize duration-500  hover:text-yellow-500 ">
              {" "}
              categories
            </button>
          </Link>
          <Link href="/admin/subscriptions">
            <button className="text-white font-bold text-center xl:text-2xl  capitalize duration-500  hover:text-yellow-500 ">
              {" "}
              Subscriptions
            </button>
          </Link>
        </div>
      ) : null}
    </>
  );
};

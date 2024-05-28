"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import burgerImg from "../../assets/burger.svg";

export const MenuAdmin = () => {
  const [burger, setBurger] = useState();

  const handleBurger = () => {
    setBurger(!burger);
    console.log("funciona");
  };

  return (
    <>
      {" "}
      <div className="hidden w-3/4  h-[50px] bg-gray-500 rounded-b-2xl shadow-gray-500 sm:flex justify-center items-center ">
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
      {burger === false ? (
        <button
          onClick={handleBurger}
          className="w-1/2 h-[40px] xl:text-xl text-gray-700 border p-1 block rounded-lg border-gray-500 font-semibold duration-1000 bg-gray-500 hover:bg-gray-700  hover:text-white m-3 capitalize sm:hidden"
        >
          menu admin
        </button>
      ) : (
        <button
          onClick={handleBurger}
          className="w-1/2 h-[40px] xl:text-xl text-gray-700 border p-1 block rounded-lg border-gray-500 font-semibold duration-1000 bg-gray-500 hover:bg-gray-700  hover:text-white m-3 capitalize sm:hidden"
        >
          Close
        </button>
      )}
      {burger === true ? (
        <div className="w-full min-h-[300px] bg-gray-950 flex flex-col  items-center justify-evenly absolute mt-14 z-20 sm:hidden">
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
        </div>
      ) : null}
    </>
  );
};

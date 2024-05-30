/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Image from "next/image";
import Login from "../../assets/login.svg";
import X from "../../assets/X.svg";
import { useState } from "react";
import BurgerImg from "../../assets/burger.svg";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import { useAuth } from "../../app/context/Context";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";

export const NavBar = () => {
  const { userData } = useAuth();

  const [loginIcon, setLoginIcon] = useState(false);

  const { data: session } = useSession();

  const [burger, setBurger] = useState(false);

  // manejador de hamburgesa
  const handleBurger = (event) => {
    event.preventDefault();

    setBurger(!burger);
  };

  // manejador de icono de login = logo y X
  const handleLoginIcon = (event) => {
    event.preventDefault();

    setLoginIcon(!loginIcon);
  };
  const handleSignOut = async () => {
    // Eliminar el token de sessionStorage
    sessionStorage.removeItem("Token");
    console.log("Token eliminado de sessionStorage");

    // Esperar un momento antes de redirigir
    await new Promise((resolve) => setTimeout(resolve, 100)); // Esperar 100ms para asegurar que el token se elimine
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <>
      <div className="w-full h-14 bg-gray-900 flex justify-evenly ">
        {/* CONTAINER MARCA/LOGO */}

        <div className="w-1/2  sm:w-1/4 h-14 flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dtwiog6cy/image/upload/v1715277145/Proyecto%20FInal/ltpvsdwg7xfds7fzm1ho.png"
            alt=""
            className="w-20 md:w-28 "
          />
        </div>

        {/* BURGER COMPONENT*/}
        <div className="w-full flex items-center justify-end lg:hidden">
          <button onClick={handleBurger}>
            <Image
              src={BurgerImg}
              alt=""
              className="w-8 mr-2 duration-1000  ShadowEffect "
            />
          </button>
        </div>

        {/* CONTAINER BOTONERA */}
        <div className="hidden  w-1/2 h-14 lg:flex justify-evenly items-center">
          <Link href="/">
            <button className="xl:text-xl text-yellow-500 font-semibold duration-1000 hover:text-yellow-300 hover:scale-110">
              Home
            </button>
          </Link>
          <Link href="/works">
            {""}
            <button className="xl:text-xl text-yellow-500 font-semibold duration-1000 hover:text-yellow-300 hover:scale-110">
              Works
            </button>
          </Link>
          <Link href="/about">
            <button className="xl:text-xl text-yellow-500 font-semibold duration-1000 hover:text-yellow-300 hover:scale-110">
              About
            </button>
          </Link>
          {session ? (
            <Link href="/createjob">
              <button className="xl:text-xl text-yellow-500 font-semibold duration-1000 hover:text-yellow-300 hover:scale-110">
                Create job
              </button>
            </Link>
          ) : null}
        </div>
        {/* CONTAINER LOGIN */}
        <div className="hidden  w-1/4 h-14 lg:flex justify-evenly items-center">
          {loginIcon === false ? (
            <button onClick={handleLoginIcon}>
              {session ? (
                <img
                  src={session.user.image}
                  alt=""
                  className="w-9 mr-2 duration-1000 ShadowEffect2 rounded-full border-2 border-yellow-500"
                />
              ) : (
                <Image
                  src={Login}
                  alt=""
                  className="w-8 mr-2 duration-1000 ShadowEffect2 "
                />
              )}
            </button>
          ) : (
            <button onClick={handleLoginIcon}>
              <Image
                src={X}
                alt=""
                className="w-8 mr-2 duration-1000  ShadowEffect2 "
              />
            </button>
          )}
        </div>
      </div>
      {/* CONTAINER FLOTANTE */}
      {/* CONTAINER FLOTANTE */}
      {/* CONTAINER FLOTANTE */}
      {loginIcon === true ? (
        <div className="w-full flex justify-end">
          <div className="hidden w-1/4 min-h-20 bg-gray-700 rounded-b-xl z-20 lg:flex flex-col justify-evenly items-center absolute ">
            {session ? (
              <>
                <Link href="/profile">
                  <button className=" w-[200px] h-[40px] xl:text-xl text-gray-700 border p-1 block rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700  hover:text-yellow-500 m-3">
                    Profile
                  </button>
                </Link>

                <Link href="/chat">
                  <button className="w-[200px] h-[40px] xl:text-xl text-gray-700 border p-1 block rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700  hover:text-yellow-500 m-3">
                    Chat
                  </button>
                </Link>
                <Link href="/subscription">
                  <button className="w-[200px] h-[40px] xl:text-xl text-gray-700 border p-1 block rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700  hover:text-yellow-500 m-3">
                    Subscription
                  </button>
                </Link>
                {userData?.role === "ADMIN" ? (
                  <Link href="/admin">
                    <button className="w-[120px] h-[40px] xl:text-xl text-white border p-1 block rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-700 hover:bg-gray-700  hover:text-yellow-500 m-3 capitalize">
                      Admin
                    </button>
                  </Link>
                ) : null}

                <button
                  onClick={async () => {
                    await signOut({
                      callbackUrl: "/",
                    });
                  }}
                  className="w-[120px] h-[40px] xl:text-xl text-white border p-1 block rounded-lg border-red-500 font-semibold duration-1000 bg-red-900 hover:bg-gray-700  hover:text-red-500 m-3"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  signIn();
                }}
                className="w-[200px] h-[40px] xl:text-xl text-gray-700 border p-1 block rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700  hover:text-yellow-500 m-3"
              >
                Login
              </button>
            )}
          </div>
        </div>
      ) : null}{" "}
      {/*  */}
      {/* CONTAINER MENU BURGER */}
      {burger === true ? (
        <div className="w-full bg-slate-600 min-h-80 lg:hidden absolute z-20">
          <div className="w-full flex flex-col justify-evenly items-center h-[150px] ">
            {" "}
            <Link href="/">
              <button className="text-md  text-yellow-500 font-medium duration-1000 hover:text-yellow-300 hover:scale-110">
                Home
              </button>
            </Link>
            {/*  */}
            <Link href="/works">
              <button className="text-md text-yellow-500 font-medium duration-1000 hover:text-yellow-300 hover:scale-110">
                Works
              </button>
            </Link>
            <Link href="/about">
              {" "}
              <button className="text-md text-yellow-500 font-medium duration-1000 hover:text-yellow-300 hover:scale-110">
                About
              </button>
            </Link>
            {session ? (
              <Link href="/createjob">
                <button className="text-md text-yellow-500 font-medium duration-1000 hover:text-yellow-300 hover:scale-110">
                  Create job
                </button>
              </Link>
            ) : null}{" "}
          </div>

          <div className="w-full  flex flex-wrap  justify-evenly items-center min-h-[100px]  ">
            {session ? (
              <>
                <Link href="/profile">
                  <button className="w-[120px] h-[40px] xl:text-xl text-gray-700 border p-1 block rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700  hover:text-yellow-500 m-3">
                    Profile
                  </button>
                </Link>
                <Link href="/chat">
                  <button className="w-[120px] h-[40px] xl:text-xl text-gray-700 border p-1 block rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700  hover:text-yellow-500 m-3">
                    Chat
                  </button>
                </Link>
                <Link href="/subscription">
                  <button className="w-[120px] h-[40px] xl:text-xl text-gray-700 border p-1 block rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700  hover:text-yellow-500 m-3">
                    Subscription
                  </button>
                </Link>
                {userData?.role === "ADMIN" ? (
                  <Link href="/admin">
                    <button className="w-[120px] h-[40px] xl:text-xl text-white border p-1 block rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-700 hover:bg-gray-700  hover:text-yellow-500 m-3 capitalize">
                      Admin
                    </button>
                  </Link>
                ) : null}

                <button
                  onClick={handleSignOut}
                  className="w-[120px] h-[40px] xl:text-xl text-white border p-1 block rounded-lg border-red-500 font-semibold duration-1000 bg-red-900 hover:bg-gray-700  hover:text-red-500 m-3"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  signIn();
                }}
                className="w-[100px] h-[40px] xl:text-xl text-gray-700 border p-1 block rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700  hover:text-yellow-500 m-3"
              >
                Login
              </button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

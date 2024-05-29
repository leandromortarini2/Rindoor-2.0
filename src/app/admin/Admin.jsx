"use client";
import React, { useEffect, useState } from "react";
import { MenuAdmin } from "../../components/MenuAdmin/MenuAdmin";
import adminImg from "../../assets/manager.svg";
import Image from "next/image";
import { useAuth } from "../context/Context";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";
import Loader from "../../components/Loader/Loader";

const Admin = () => {
  const [LoaderState, setLoaderState] = useState(true);

  const { userData } = useAuth();

  // console.log(">>>>>>>>", userData);
  useEffect(() => {
    try {
      if (userData?.role !== "ADMIN") {
        Swal.fire({
          title: "Alto!",
          text: "El acceso negado",
          icon: "error",
          confirmButtonText: "Completar",
        });
        redirect("/");
      }
    } finally {
      setLoaderState(false); //agregale seguido del catch, este finally
    }
  }, [userData]);

  return LoaderState ? (
    <Loader />
  ) : (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 flex flex-col items-center">
      <MenuAdmin />
      <div className="w-full md:w-3/4 min-h-72 md:bg-gray-900 flex flex-col md:flex-row justify-evenly items-center m-5 rounded-3xl">
        <div className="w-full xl:w-1/2 h-[200px] flex flex-col justify-evenly">
          <h2 className="text-2xl md:text-2xl lg:text-3xl text-yellow-500 font-bold text-center uppercase">
            admin
          </h2>
          <p className="text-2xl md:text-2xl lg:text-3xl text-white font-bold text-center capitalize">
            {userData?.name}
          </p>
          <p className="text-xl md:text-lg lg:text-xl xl:text-3xl text-white font-bold text-center">
            {userData?.email}
          </p>
        </div>
        <Image src={adminImg} alt="Admin" className="w-60 md:w-60 lg:w-80" />
      </div>
    </div>
  );
};

export default Admin;

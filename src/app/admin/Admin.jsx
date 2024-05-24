"use client";
import React from "react";
import { MenuAdmin } from "../../components/MenuAdmin/MenuAdmin";
import adminImg from "../../assets/manager.svg";
import Image from "next/image";
import Geocoder from "../../components/Geocoder/Geocoder";

const Admin = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 flex  flex-col items-center">
      <MenuAdmin />
      <div className="w-1/2 min-h-72 bg-gray-500 flex justify-between items-center m-5 rounded-3xl">
        <div className="w-1/2">
          <h2 className="text-3xl text-gray-900 font-bold text-center uppercase">
            admin
          </h2>
        </div>

        <Image src={adminImg} alt="" />
      </div>
    </div>
  );
};
export default Admin;

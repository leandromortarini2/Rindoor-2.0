"use client";
import React from "react";
import { useSession } from "next-auth/react";

export const Register = () => {
  const { data: session } = useSession();
  return (
    <div className="w-1/2 min-h-screen  flex flex-col items-center">
      <form className="w-3/4 h-[450px] flex flex-col justify-evenly items-center bg-gray-900 rounded-3xl">
        <h2 className="text-2xl text-center text-yellow-500 font-bold  ">
          Complete your personal information
        </h2>
        <div className="w-full flex flex-col justify-center items-center">
          <label htmlFor="">Name</label>
          <input
            type="text"
            value={session.user.name}
            className=" text-gray-900 font-semibold w-1/2"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={session.user.email}
            className=" text-gray-900 font-semibold w-1/2"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <label htmlFor="">Phone</label>
          <input
            type="text"
            placeholder="Phone..."
            className=" text-gray-900 font-semibold w-1/2"
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          <label htmlFor="">Address</label>
          <input
            type="text"
            placeholder="Address..."
            className=" text-gray-900 font-semibold w-1/2"
          />{" "}
        </div>

        <select name="role" id="" className="bg-gray-900">
          <option value="client">Client</option>
          <option value="professional">professional</option>
        </select>
        <button className="bg-yellow-900">Register</button>
      </form>
    </div>
  );
};

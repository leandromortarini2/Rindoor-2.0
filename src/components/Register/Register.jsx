"use client";
import React from "react";

export const Register = () => {
  return (
    <div className="w-full bg-gray-800 flex flex-col items-center">
      <h2 className="text-5xl text-center">Register</h2>
      <form className="w-3/4 h-[450px] flex flex-col justify-evenly items-center ">
        <input type="text" placeholder="firstName..." />
        <input type="text" placeholder="lastName..." />
        <input type="email" placeholder="email..." />
        <input type="text" placeholder="celu..." />
        <input type="text" placeholder="address..." />
        <select name="role" id="" className="bg-gray-900">
          <option value="client">PPPP</option>
          <option value="professional">professional</option>
        </select>
        <button className="bg-yellow-900">Register</button>
      </form>
    </div>
  );
};

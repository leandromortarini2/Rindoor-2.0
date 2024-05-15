"use client";
import { useState } from "react";
import { Register } from "../../components/Register/Register";
import { useSession } from "next-auth/react";

function ProfileClient() {
  const { data: session } = useSession();

  console.log(session);

  return (
    session && (
      <>
        <div className="w-full min-h-screen flex flex-col justify-start items-center bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300">
          <div className="w-1/2 h-80 mt-10 mb-5 flex flex-col  justify-evenly items-center bg-gray-900 rounded-2xl ">
            {" "}
            <div className="w-3/4 flex flex-col items-center ">
              <img
                src={session.user.image}
                className="w-40 h-40 rounded-full border-gray-900 border-4"
              />
              <h2 className="text-yellow-500  text-5xl font-bold">
                {session.user.name}
              </h2>
              <p className="text-white text-2xl font-semibold">
                {session.user.email}
              </p>
            </div>
          </div>{" "}
          <Register />{" "}
        </div>{" "}
      </>
    )
  );
}
export default ProfileClient;

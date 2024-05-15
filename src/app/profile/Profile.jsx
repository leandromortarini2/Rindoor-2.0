"use client";
import { Register } from "../../components/Register/Register";
import { useSession } from "next-auth/react";

function ProfileClient() {
  const { data: session } = useSession();

  console.log(session);

  return (
    session && (
      <>
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 h-screen">
          <h2 className="text-gray-900 text-5xl font-bold">Personal Profile</h2>
          <div className="w-1/2 h-80 mt-10 bg-gray-900 rounded-3xl flex justify-evenly items-center shadow-black shadow-2xl">
            <img
              src={session.user.image}
              className="w-40 h-40 rounded-full border-yellow-500 border-4"
            />

            <div>
              <h2 className="text-yellow-500 text-5xl font-bold">
                {session.user.name}
              </h2>
              <p className="text-white text-2xl font-semibold">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>
        <Register />
      </>
    )
  );
}
export default ProfileClient;

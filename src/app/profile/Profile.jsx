"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  console.log(user);

  return (
    user && (
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 h-screen">
        <h2 className="text-gray-900 text-5xl font-bold">Personal Profile</h2>
        <div className="w-1/2 h-80 mt-10 bg-gray-900 rounded-3xl flex justify-evenly items-center shadow-black shadow-2xl">
          <img
            src={user.picture}
            alt={user.name}
            className="w-40 h-40 rounded-full border-yellow-500 border-4"
          />

          <div>
            <h2 className="text-yellow-500 text-5xl font-bold">{user.name}</h2>
            <p className="text-white text-2xl font-semibold">{user.email}</p>
          </div>
        </div>
      </div>
    )
  );
}
export default ProfileClient;

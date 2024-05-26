import React from "react";

export const Ban = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-red-950 via-red-700 to-red-950 flex flex-col items-center justify-center">
      {" "}
      <h1 className="text-6xl font-bold capitalize">
        this user has been banned
      </h1>
      <img
        src="https://res.cloudinary.com/dtwiog6cy/image/upload/v1716661933/Proyecto%20FInal/ggw4xn6fvw13ktdjab5y.png"
        alt=""
      />
    </div>
  );
};

export default Ban;

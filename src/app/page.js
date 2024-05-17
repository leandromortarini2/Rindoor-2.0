"use client";
import { useSession } from "next-auth/react";
import Carrusel2 from "../components/Carrusel2/Carrusel2";
import { Categories } from "../components/Categories/Categories";
import { postEmail } from "../helpers/postSingin";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    const fetchEmail = async () => {
      if (session?.user?.email) {
        try {
          const token = await postEmail(session.user.email);
          localStorage.setItem("Token", token);
        } catch (error) {
          console.error("Error al obtener el email:", error);
        }
      }
    };

    fetchEmail();
  }, [session]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 ">
      <div className="w-full xl:h-52 flex flex-col items-center justify-center">
        <img
          src="https://images-ext-1.discordapp.net/external/b88xtpwXUOtoZ2uXbYlvcGwFkQZ_IMzTfx6KC9oiuf0/https/res.cloudinary.com/dtwiog6cy/image/upload/v1715277145/Proyecto%2520FInal/ltpvsdwg7xfds7fzm1ho.png?format=webp&quality=lossless&width=705&height=258"
          alt=""
          className=" w-56 sm:w-64 xl:w-80"
        />
        <h2 className="text-gray-700 xl:text-3xl font-bold">
          Donde los profesionales te buscan a ti
        </h2>
      </div>
      <Carrusel2 />

      <Categories />
    </div>
  );
}

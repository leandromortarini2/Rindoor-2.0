"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import PostImg from "../../assets/loudspeaker.svg";
import chatImg from "../../assets/chat.svg";
import adminImg from "../../assets/manager.svg";
import subsciptionImg from "../../assets/document.svg";
import { useAuth } from "../context/Context";
import { useEffect, useState } from "react";
import { getCategory } from "../../helpers/getCategory";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";

function ProfileClient() {
  const { data: session } = useSession();
  const { userData } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (userData === "ban") {
      Swal.fire({
        title: "Usuario Banneado!",
        text: "Tu cuenta ha sido suspendida temporalmente debido a actividades que infringen nuestras políticas. Por favor, contáctanos para obtener más información y resolver esta situación lo antes posible.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      redirect("/");
    }

    const fetchCategory = async () => {
      try {
        const categoryData = await getCategory();
        setCategories(categoryData);
        console.log("Categorías obtenidas: ", categoryData);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategory();
  }, []);

  // Convertir categories a un array si es una cadena
  const userCategories =
    typeof userData?.categories === "string"
      ? JSON.parse(userData.categories)
      : userData?.categories;

  return (
    session && (
      <>
        <div className="w-full sm:min-h-screen flex flex-col md:flex-row justify-center items-center bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300">
          <div className="w-3/4 mt-5 sm:mt-0 md:w-1/2 lg:w-1/3 md:min-h-[300px] md:max-h-[300px] rounded-t-xl sm:rounded-none lg:min-h-[400px] lg:max-h-[400px] xl:min-h-[600px] xl:max-h-[600px] overflow-hidden flex justify-center md:justify-start items-center bg-gray-900 md:bg-gray-900 md:rounded-l-2xl">
            <div className="w-full lg:min-h-[380px] md:min-h-[300px] md:max-h-[300px] flex flex-col justify-center items-center m-5">
              <img
                src={session?.user.image}
                className="w-32 h-32 xl:w-40 xl:h-40 rounded-full border-gray-900 lg:border-yellow-500 border-4 ShadowEffect mb-5"
              />
              <h2 className="text-yellow-500 text-xl lg:text-3xl font-bold tracking-wid capitalize">
                {session.user.name}
              </h2>
              <p className="text-sm text-white lg:text-xl font-semibold">
                {session.user.email}
              </p>
              <p className="text-sm text-white lg:text-xl font-semibold">
                {userData?.country}
              </p>
              <p className="text-sm text-white lg:text-xl font-semibold">
                {userData?.province}
              </p>
              <p className="text-sm text-yellow-500 lg:text-xl font-bold mt-2">
                {userData?.role}
              </p>
              {userData?.role === "PROFESSIONAL" &&
                Array.isArray(userCategories) &&
                userCategories.map((elementID, index) => (
                  <div key={index} className=" w-full flex justify-evenly ">
                    {categories.map((categoryID) => {
                      console.log("****************", categoryID);
                      if (categoryID.id === elementID) {
                        return (
                          <span key={categoryID.id} className="font-bold">
                            {categoryID.name}
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
            </div>
          </div>
          <div className="w-3/4 md:w-1/3 xl:w-1/2 md:min-h-[300px] md:max-h-[300px] lg:min-h-[400px] lg:max-h-[400px] xl:min-h-[600px] xl:max-h-[600px] overflow-hidden flex flex-col justify-center items-center bg-gray-800 rounded-b-xl sm:rounded-none md:rounded-r-2xl mb-5 sm:mb-0">
            <div className="w-3/5 rounded-2xl">
              <h2 className="hidden lg:block lg:text-2xl xl:text-5xl text-gray-900 lg:text-yellow-500 font-bold capitalize text-center tracking-wid shadow-black">
                profile <span>{userData?.role}</span>
              </h2>
              <h2 className="hidden lg:block lg:text-white lg:text-md xl:text-2xl font-bold mb-5 capitalize text-center">
                welcome to your panel
              </h2>
            </div>

            <div className="w-full xl:w-3/4 flex flex-wrap justify-center xl:max-w-[500px]">
              {userData?.role === "CLIENT" ? (
                <div className="w-20 h-20 lg:w-32 lg:h-24 xl:w-52 xl:h-40 flex flex-col justify-center items-center xl:text-xl text-gray-600 border p-1 rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-900 hover:text-yellow-500 m-3 capitalize shadow-black shadow-lg">
                  <p className="mb-2 text-xs lg:text-lg xl:text-xl">my posts</p>
                  <Link href="/myposts">
                    <Image
                      src={PostImg}
                      alt=""
                      className="w-8 lg:w-12 xl:w-16"
                    />
                  </Link>
                </div>
              ) : null}
              <div className="w-20 h-20 lg:w-32 lg:h-24 xl:w-52 xl:h-40 flex flex-col justify-center items-center xl:text-xl text-gray-600 border p-1 rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-900 hover:text-yellow-500 m-3 capitalize shadow-black shadow-lg">
                <p className="mb-2 text-xs lg:text-lg xl:text-xl">chat</p>

                <Link href="/chat">
                  <span>
                    <Image
                      src={chatImg}
                      alt=""
                      className="w-8 lg:w-12 xl:w-16"
                    />{" "}
                  </span>
                </Link>
              </div>{" "}
              <div className="w-20 h-20 lg:w-32 lg:h-24 xl:w-52 xl:h-40 flex flex-col justify-center items-center xl:text-xl text-gray-600 border p-1 rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-900 hover:text-yellow-500 m-3 capitalize shadow-black shadow-lg">
                <p className="mb-2 text-xs lg:text-lg xl:text-xl">
                  subscription
                </p>
                <Link href="/subscription">
                  <span>
                    <Image
                      src={subsciptionImg}
                      alt=""
                      className="w-8 lg:w-12 xl:w-16"
                    />
                  </span>
                </Link>
              </div>
              {userData?.role === "ADMIN" ? (
                <div className="w-20 h-20 lg:w-32 lg:h-24 xl:w-52 xl:h-40 flex flex-col justify-center items-center xl:text-xl text-gray-600 border p-1 rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-900 hover:text-yellow-500 m-3 capitalize shadow-black shadow-lg">
                  <p className="mb-2 text-xs lg:text-lg xl:text-xl">Admin</p>
                  <Link href="/admin">
                    <span>
                      <Image
                        src={adminImg}
                        alt=""
                        className="w-10 lg:w-14 xl:w-20"
                      />
                    </span>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default ProfileClient;

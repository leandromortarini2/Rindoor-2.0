"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import PostImg from "../../assets/loudspeaker.svg";
import chatImg from "../../assets/chat.svg";
import updateImg from "../../assets/user.svg";
import subsciptionImg from "../../assets/document.svg";

function ProfileClient() {
  const { data: session } = useSession();

  // console.log(session);

  return (
    session && (
      <>
        <div className="w-full min-h-screen flex  justify-center items-center bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300">
          <div className="w-1/3 min-h-[450px] flex  justify-start items-center  bg-gray-900 rounded-l-2xl  ">
            {" "}
            <div className="w-full min-h-[380px]  flex flex-col justify-center items-center   m-5 ">
              <img
                src={session.user.image}
                className="w-40 h-40 rounded-full border-yellow-500 border-4 ShadowEffect"
              />
              <h2 className="text-yellow-500  text-5xl font-bold">
                {session.user.name}
              </h2>
              <p className="text-white text-2xl font-semibold">
                {session.user.email}
              </p>
            </div>
          </div>{" "}
          <div className="w-1/2 min-h-[450px] flex flex-col justify-center items-center   bg-gray-800 rounded-r-2xl ">
            <div className="w-3/5   rounded-2xl">
              <h2 className="text-3xl text-yellow-500 font-bold m-5 capitalize text-center">
                welcome to your profile
              </h2>
            </div>

            <div className="flex flex-wrap justify-center ">
              <div className="w-60 h-32 flex flex-col justify-center items-center  xl:text-xl text-gray-700 border p-1  rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700 hover:text-yellow-500 m-3 capitalize">
                <p className="mb-2"> my posts</p>
                <Link href="">
                  {" "}
                  <Image src={PostImg} alt="" className=" w-16" />
                </Link>
              </div>

              <div className="w-60 h-32 flex flex-col justify-center items-center  xl:text-xl text-gray-700 border p-1  rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700 hover:text-yellow-500 m-3 capitalize">
                <p className="mb-2">chat</p>
                <Link href="">
                  <Image src={chatImg} alt="" className=" w-16" />
                </Link>
              </div>

              <div className="w-60 h-32 flex flex-col justify-center items-center  xl:text-xl text-gray-700 border p-1  rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700 hover:text-yellow-500 m-3 capitalize">
                <p className="mb-2">update your data</p>
                <Link href="/update">
                  <Image src={updateImg} alt="" className=" w-16" />
                </Link>
              </div>

              <div className="w-60 h-32 flex flex-col justify-center items-center  xl:text-xl text-gray-700 border p-1  rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700 hover:text-yellow-500 m-3 capitalize">
                <p className="mb-2">my subscription</p>
                <Link href="/subscription">
                  <span className=" ">
                    <Image src={subsciptionImg} alt="" className=" w-16" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>{" "}
      </>
    )
  );
}
export default ProfileClient;

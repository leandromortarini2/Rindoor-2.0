import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Categories = () => {
  return (
    <div className="w-full flex flex-col items-center mb-10">
      <div className=" w-full flex flex-wrap  justify-evenly items-center mb-5">
        <div className="w-32 h-32 xl:w-[200px] xl:h-[200px] bg-white shadow-2xl shadow-slate-900 overflow-hidden rounded-xl flex items-center justify-center hover:scale-105 duration-1000 mt-5">
          <Link href="">
            <button>
              <img
                src="https://res.cloudinary.com/dtwiog6cy/image/upload/v1715197035/Proyecto%20FInal/g4sd4zs4ovxeyfbpuhnn.png"
                alt=""
                className="w-50 h-24 xl:h-40 ShadowEffectCards duration-1000"
              />
            </button>
          </Link>
        </div>
        <div className="w-32 h-32 xl:w-[200px] xl:h-[200px] bg-white shadow-2xl shadow-slate-900 overflow-hidden rounded-xl flex items-center justify-center hover:scale-105 duration-1000 mt-5">
          <Link href="">
            <button>
              <img
                src="https://res.cloudinary.com/dtwiog6cy/image/upload/v1715197035/Proyecto%20FInal/sakieeqisdacuybr5f49.png"
                alt=""
                className="w-50 h-24 xl:h-40 ShadowEffectCards duration-1000"
              />
            </button>
          </Link>
        </div>
        {/* electricidad container */}
        <div className="w-32 h-32 xl:w-[200px] xl:h-[200px] bg-white shadow-2xl shadow-slate-900 overflow-hidden rounded-xl flex items-center justify-center hover:scale-105 duration-1000 mt-5">
          <Link href="">
            <button>
              <img
                src="https://res.cloudinary.com/dtwiog6cy/image/upload/v1715197035/Proyecto%20FInal/egicfd28d0wy9ugmsnh6.png"
                alt=""
                className="w-20 h-24 xl:h-40 xl:w-40 ShadowEffectCards duration-1000"
              />
            </button>
          </Link>
        </div>
        <div className="w-32 h-32 xl:w-[200px] xl:h-[200px] bg-white shadow-2xl shadow-slate-900 overflow-hidden rounded-xl flex items-center justify-center hover:scale-105 duration-1000 mt-5">
          <Link href="">
            <button>
              <img
                src="https://res.cloudinary.com/dtwiog6cy/image/upload/v1715197035/Proyecto%20FInal/oprlgxzvykf5mfxakwrn.png"
                alt=""
                className="w-50 h-24 xl:h-40 ShadowEffectCards duration-1000"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

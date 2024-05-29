import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategory } from "../../helpers/getCategory";

export const Categories = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchGetPosts = async () => {
      try {
        const newCategory = await getCategory();
        setCategories(newCategory);
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        setError("Error al obtener publicaciones.");
      }
    };
    fetchGetPosts();
  }, [categories]);
  return (
    <div className="w-full flex flex-col items-center   rounded-3xl m-10">
      <h2 className="text-center text-gray-800  text-xl lg:text-3xl  font-bold  capitalize">
        Estas son algunos de las especialidades
      </h2>
      <div className="w-full flex flex-wrap justify-evenly items-center mb-5 ">
        {categories?.map((element) => {
          return (
            <div
              key={element.id}
              className="w-3/4  xl:w-[300px] xl:h-[300px] bg-gray-800   overflow-hidden rounded-xl flex flex-col items-center justify-evenly  mt-5 p-4"
            >
              <h2 className="text-xl text-yellow-500  font-bold tracking-wide">
                {element.name}
              </h2>
              <p className="text-md xl:text-lg text-gray-300  tracking-wide text-center pr-2 pl-2">
                {element.description}{" "}
              </p>
              <img
                src={element.img}
                alt=""
                width={200}
                height={100}
                className="w-50 h-24 xl:h-40 ShadowEffectCards duration-1000  "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

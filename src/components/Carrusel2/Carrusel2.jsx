"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

export const Carrusel2 = () => {
  const [imagenActual, setImagenActual] = useState(0);

  const imagenResponsive = useMediaQuery({ query: "(max-width: 770px)" });

  const imageLaptop = [
    "https://i.ibb.co/jzg88vT/plomero.png",
    "https://i.ibb.co/KDwxF11/albanil.png",
    "https://i.ibb.co/ydC8Hf3/elec.png",
    "https://i.ibb.co/2t2QX1t/pintor.png",
  ];

  const imageMovile = [
    "https://i.ibb.co/vqc85vG/plomero-Full.png",
    "https://i.ibb.co/J5fq6pp/albanil-Full.png",
    "https://i.ibb.co/CPQwMBJ/elecFull.png",
    "https://i.ibb.co/cXfjfXx/pintor-Full.png",
  ];

  const imagenes = imagenResponsive ? imageMovile : imageLaptop;

  const avanzar = () => {
    setImagenActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };

  const retroceder = () => {
    setImagenActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(avanzar, 3000); // Cambiar de imagen cada 6 segundos
    return () => clearInterval(intervalId); // Limpia el temporizador cuando el componente se desmonta
  }, []); // Ejecuta solo una vez al montar el componente

  return (
    <div className="w-full flex flex-col lg:flex-row justify-evenly mt-10 px-4">
      <div className="w-full mb-5  lg:w-5/6 lg:min-h-5 mr-2">
        <Link href='/subscription'>
          <img
            src="https://i.ibb.co/Hr57GQ8/Dise-o-sin-t-tulo-2.png"
            alt=""
            className="w-full h-60  md:h-96 rounded-xl"
          />
        </Link>
      </div>

      <div className="w-full h-72 lg:w-1/3 lg:min-h-5">
        <div
          id="default-carousel"
          className="relative w-full"
          data-carousel="slide"
        >
          <div className="relative h-72 overflow-hidden rounded-lg lg:w-full lg:h-96">
            {imagenes.map((imagen, index) => (
              <div
                key={index}
                className={`${
                  index === imagenActual ? "block" : "hidden"
                } duration-700 ease-in-out`}
                data-carousel-item
              >
                <img
                  src={imagen}
                  className="absolute block w-full h-72 md:h-96 lg:w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover rounded-xl"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            {imagenes.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  index === imagenActual ? "bg-blue-500" : "bg-gray-300"
                }`}
                aria-current={index === imagenActual ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
                onClick={() => setImagenActual(index)}
              ></button>
            ))}
          </div>
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={retroceder}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={avanzar}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrusel2;

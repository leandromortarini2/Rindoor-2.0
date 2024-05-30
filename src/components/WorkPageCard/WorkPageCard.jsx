"use client";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { postPostulation } from "../../helpers/helperWorksPage";
import { useAuth } from "../../app/context/Context";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { MyComponent } from "../MyComponent/MyComponent";

export const WorkPageCard = ({ cardData }) => {
  const { userData } = useAuth();
  const [userDataState, setUserDataState] = useState(null);
  const [redirectPath, setRedirectPath] = useState(null);
  useEffect(() => {
    if (userData) {
      setUserDataState(userData);
    }
  }, [userData]);
  const initialData = {
    message: "",
    offered_price: 0,
  };
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const formatearFecha = (fecha) => {
    const fecha1 = new Date(fecha);
    const opciones = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return fecha1.toLocaleString("es", opciones);
  };
  const formattedDate = formatearFecha(cardData?.created_at);
  const validate = (data) => {
    let errorsObj = {};
    if (!data.message) {
      errorsObj.message = "inserte un mensaje";
    }
    if (!data.offered_price || data.offered_price <= 0) {
      errorsObj.offered_price = "inserte un presupuesto estimado válido";
    }
    return errorsObj;
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors(validate({ ...formData, [name]: value }));
  };
  const handleClick = async () => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
  
    const dataPostulations = {
      message: formData.message,
      offered_price: formData.offered_price,
      userId: userDataState.id,
      jobId: cardData.id,
    };
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await postPostulation(dataPostulations);
        if (response.success) {
          Swal.fire({
            title: "¡Felicidades!",
            text: "Tu postulación fue creada con éxito!",
            confirmButtonText: "Aceptar",
          }).then(() => {
            setRedirectPath("/works");
          });
        } else {
          throw new Error(response.message || "Error en la postulación");
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Sus categorías no coinciden con este trabajo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        }).then(() => {
          setRedirectPath("/works");
        });
      }
    }
  };

  const handleClick1 = () => {
    console.log(cardData);
  };

  useEffect(() => {
    if (redirectPath) {
      window.location.href = redirectPath;
    }
  }, [redirectPath]);

  return (
    <div className="bg-gray-800 min-h-screen  w-full sm:w-4/5  sm:my-5 sm:rounded-2xl">
      <div className="ml-7 mt-2 flex-row flex items-center">
        <img src={cardData?.category.img} className=" w-10 h-10 " />
        <h3 className="text-yellow-200 italic text-2xl">
          {cardData?.category.name}
        </h3>
      </div>
      <div className="flex flex-col items-center ">
        <div className="m-2 flex flex-col lg:flex-row w-full ">
          <div className="mx-5 lg:w-1/2 mt-4 flex items-center justify-center rounded">
            <img
              className=" rounded w-[540px] h-[260px] object-contain "
              src={cardData?.img}
              alt="ilustracion-trabajo"
            />
          </div>
          <div className="flex flex-col ml-4 lg:w-1/2 w-full ">
            <div className="w-full flex justify-center lg:justify-normal mb-5">
              <h2 className="text-5xl font-bold text-yellow-300 lg:m-0 mt-5">
                {cardData?.name}
              </h2>
            </div>
            <div className="lg:flex-none lg:flex md:flex md:flex-row lg:flex-col w-full">
              <div className="lg:w-auto w-1/2">
                <div className=" text-2xl text-white flex ">
                  <FaLocationDot className="mt-0.5" />
                  <h3>{`${cardData?.city}, ${cardData?.province}`}</h3>
                </div>
                <h3 className="my-5 text-2xl text-white">
                  {`Creado el: ${formattedDate}`}
                </h3>
              </div>
              <div>
                <h3 className="mb-5 text-2xl text-white">
                  {`Usuario: ${cardData?.client.name}`}
                </h3>
                <h3 className=" text-3xl text-white">
                  {`Presupuesto : ${cardData?.base_price}$`}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center mt-10">
          <h2 className="text-4xl font-bold text-yellow-300 my-5 capitalize">
            Descripción
          </h2>
          <h4 className="w-4/5 my-5 text-lg text-center">
            {cardData?.description}
          </h4>
          <div className=" my-10">
            <MyComponent coords={cardData?.coords} />
          </div>
        </div>
        <div className=" mx-5 bg-gray-900 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-yellow-500">
              <p className="font-medium text-lg">Postulate!</p>
            </div>
            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label className="text-yellow-500">Mensaje</label>
                  <input
                    type="text"
                    name="message"
                    className="bg-gray-800 h-10 border mt-1 rounded px-4 w-full"
                    placeholder="Mensaje..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && (
                    <p className="text-red-500">{errors.message}</p>
                  )}
                </div>
                <div className="md:col-span-5">
                  <label className="text-yellow-500">Presupuesto</label>
                  <input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    type="number"
                    name="offered_price"
                    value={formData.offered_price}
                    onChange={handleChange}
                    className="bg-gray-800 h-10 border mt-1 rounded px-4 w-full"
                    placeholder="00.0"
                  />
                  {errors.offered_price && (
                    <p className="text-red-500">{errors.offered_price}</p>
                  )}
                </div>
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button
                      onClick={handleClick}
                      className="bg-yellow-300 text-gray-900 hover:bg-gray-700 hover:text-yellow-500 font-bold py-2 px-4 rounded"
                    >
                      Enviar!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { FaLocationDot } from "react-icons/fa6";
export const WorkPageCard = ({ cardData }) => {
  console.log(cardData);
  const date = new Date(cardData.created_at);
  const formattedDate = {
    year: "2024",
    month: "mayo ",
    day: "19 de ",
  };

  return (
    <div className="bg-gray-800  min-h-screen w-4/5 my-5 rounded-2xl">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <h2 className=" flex-end text-2xl p-2 italic text-yellow-200 ">
            Albañileria
          </h2>
        </div>
        <div className="m-2 flex flex-col lg:flex-row w-full">
          <div className="mx-5 lg:w-1/2 h-96 flex items-center justify-center">
            <img
              className=" bg-white rounded max-w-fit max-h-96"
              src={cardData.img}
              alt="ilustracion-trabajo"
            />
          </div>
          <div className=" flex flex-col ml-4 lg:w-1/2 w-full">
            <div className="w-full flex justify-center lg:justify-normal">
              <h2 className="text-5xl font-bold text-yellow-300 lg:m-0 mt-10">
                {cardData.name}
              </h2>
            </div>
            <div className="ASDSAD lg:flex-none lg:flex md:flex md:flex-row lg:flex-col w-full">
              <div className="lg:w-auto lg:w-auto w-1/2 ">
                <h3 className="my-5 text-2xl text-yellow-300">
                  {cardData.user.name}
                </h3>
                <h3 className="my-5 text-2xl text-yellow-300">
                  {formattedDate}
                </h3>
              </div>
              <div>
                <div className="flex flex-row items-center text-yellow-300  mt-3 lg:mt-0 ">
                  <FaLocationDot size={30} />
                  <h3 className="ml-5 mr-10 text-2xl">Zárate , Buenos Aires</h3>
                </div>
                <h3 className="my-5 text-3xl text-yellow-300">
                  Presupuesto :{cardData.base_price}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center mt-10">
          <h2 className="text-5xl font-bold text-yellow-300 my-5 underline underline-offset-1">
            Descripción
          </h2>
          <h4 className="w-4/5 my-5">{cardData.description}</h4>
        </div>
        <div className="bg-gray-900 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
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
                    name="presupuesto"
                    className=" bg-gray-800 h-10 border mt-1 rounded px-4 w-full  "
                    placeholder="Mensaje..."
                  />
                </div>
                <div className="md:col-span-5">
                  <label className="text-yellow-500">Presupuesto</label>
                  <input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    type="number"
                    name="full_name"
                    id="full_name"
                    className=" bg-gray-800 h-10 border mt-1 rounded px-4 w-full "
                    placeholder="00.0"
                  />
                </div>

                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button className="bg-yellow-300 text-gray-900 hover:bg-gray-700 hover:text-yellow-500 font-bold py-2 px-4 rounded">
                      Submit
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

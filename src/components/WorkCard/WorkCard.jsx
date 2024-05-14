import React from "react";

export const WorkCard = ({ card }) => {
  return (
    <a
      key={card.name}
      href="#"
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={card.img}
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-yellow-500">
          {card.name}
        </h5>
        {/* <p className="mb-3 font-normal text-yellow-300">{card.user}</p> */}
        <p className="mb-3 font-normal text-yellow-300">{card.created_at}</p>
        <p className="mb-3 font-normal text-yellow-300">{card.category.name}</p>
        <p className="mb-3 font-normal text-yellow-300">{card.base_price}</p>
      </div>
    </a>
  );
};

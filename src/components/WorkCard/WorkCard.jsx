import React from "react";

export const WorkCard = ({ card }) => {
  const date = new Date(card.created_at);
  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <a
      key={card.name}
      href={`./works/${card.id}`}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        className="object-contain w-auto rounded-t-lg h-[20rem] md:h-[10rem] md:w-48 md:rounded md:rounded-s-lg"
        src={card.img}
        alt="work description image"
      />
      <div className="flex flex-col justify-between p-4 leading-normal justify-items-start w-full md:w-auto overflow-hidden">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-yellow-500 overflow-hidden md:text-ellipsis  break-words md:break-normal ">
          {card.name}
        </h5>
        {/* <p className="mb-3 font-normal text-yellow-300">{card.user}</p> */}
        <p className="mb-3 font-normal text-yellow-300">{formattedDate}</p>
        <p className="mb-3 font-normal text-yellow-300">{card.category.name}</p>
        <p className="mb-3 font-normal text-yellow-300">{`${card.base_price}$`}</p>
      </div>
    </a>
  );
};

import React from "react";

export const PaginacionPost = ({ Pagination, currentPage, totalPages }) => {
  const flechas = { anterior: "<", siguiente: ">" };
  const indStyle =
    "border-4 text-gray-900 border-gray-900 text-2xl rounded-full px-2 hover:cursor-pointer hover:bg-gray-900 hover:text-yellow-500";

  const handleClickA = () => {
    if (currentPage > 1) {
      Pagination(currentPage - 1);
    }
  };

  const handleClickS = () => {
    if (currentPage < totalPages) {
      Pagination(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-row justify-center mb-4">
      <span className={indStyle} onClick={handleClickA}>
        {flechas.anterior}
      </span>
      <p className={indStyle}>{currentPage}</p>
      <span className={indStyle} onClick={handleClickS}>
        {flechas.siguiente}
      </span>
    </div>
  );
};

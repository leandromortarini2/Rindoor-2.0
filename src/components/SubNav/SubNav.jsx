import React from "react";
import { Selector } from "../Selector/Selector";
import { PriceFilter } from "../PriceFilter/PriceFilter";

export const SubNav = ({
  filterWorksCategory,
  filterWorksPrice,
  resetData,
}) => {
  return (
    <div className="lg:w-4/5 flex  bg-gray-900 rounded-b flex lg:flex-row w-full flex-col ">
      <div className="flex sm:flex-row p-2 flex-col items-center">
        <Selector filterWorksCategory={filterWorksCategory} />
        <PriceFilter filterWorksPrice={filterWorksPrice} />
      </div>
      <div className="flex  lg:justify-evenly sm:w-full">
        <button
          type="button"
          className=" h-7 inline-block m-4 rounded bg-yellow-300 px-3 pb-1 pt-1.5 text-xs font-medium uppercase text-gray-900  ease-in-out hover:bg-yellow-500  "
          onClick={() => {
            resetData();
          }}
        >
          reset
        </button>
        <button
          href="/works"
          type="button"
          className=" h-7 inline-block m-4 rounded bg-yellow-300 px-3 pb-1 pt-1.5 text-xs font-medium uppercase text-gray-900  ease-in-out hover:bg-yellow-500  "
          onClick={() => {
            //   console.log("funciona??");
            //   setWorks1();
          }}
        >
          sortby
        </button>
      </div>
    </div>
  );
};

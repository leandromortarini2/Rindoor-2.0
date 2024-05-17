import React, { useRef } from "react";
import { Selector } from "../Selector/Selector";
import { PriceFilter } from "../PriceFilter/PriceFilter";

export const SubNav = ({
  filterWorksCategory,
  filterWorksPrice,
  resetData,
}) => {
  const childRef = useRef(null);
  const Resetear = () => {
    if (childRef.current) {
      childRef.current.Resetear();
    }
  };
  return (
    <div className="bg-gray-800  flex w-full  md:flex-row flex-col items-center md:justify-evenly">
      <Selector filterWorksCategory={filterWorksCategory} ref={childRef} />
      <PriceFilter filterWorksPrice={filterWorksPrice} />
      <div className=" flex flex-row">
        <button
          type="button"
          className=" h-7 inline-block m-4 rounded bg-yellow-300 px-3 pb-1 pt-1.5 text-xs font-medium uppercase text-gray-900  ease-in-out hover:bg-yellow-500  "
          onClick={() => {
            resetData();
            Resetear();
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

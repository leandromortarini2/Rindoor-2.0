import React, { useRef } from "react";
import { Selector } from "../Selector/Selector";
import { PriceFilter } from "../PriceFilter/PriceFilter";
import { SortBy } from "../SortBy/SortBy";

export const SubNav = ({
  filterWorksCategory,
  filterWorksPrice,
  sortWorks,
  resetData,
}) => {
  const childRef = useRef(null);
  const Resetear = () => {
    if (childRef.current) {
      childRef.current.Resetear();
    }
  };
  const childRef1 = useRef(null);
  const Resetear1 = () => {
    if (childRef1.current) {
      childRef1.current.Resetear();
    }
  };
  const childRef2 = useRef(null);
  const Resetear2 = () => {
    if (childRef2.current) {
      childRef2.current.ResetearPrecios();
    }
  };
  return (
    <div className="bg-gray-800  flex w-full  md:flex-row flex-col items-center md:justify-evenly">
      <Selector filterWorksCategory={filterWorksCategory} ref={childRef} />
      <PriceFilter filterWorksPrice={filterWorksPrice} ref={childRef2} />
      <div className=" flex flex-row  ">
        <button
          type="button"
          className="mr-10  h-7 inline-block m-4 rounded bg-yellow-300 px-3 pb-1 pt-1.5 text-xs font-medium uppercase text-gray-900  ease-in-out hover:bg-yellow-500  "
          onClick={() => {
            resetData();
            Resetear();
            Resetear1();
            Resetear2();
          }}
        >
          reset
        </button>
        <SortBy sortWorks={sortWorks} ref={childRef1} />
      </div>
    </div>
  );
};

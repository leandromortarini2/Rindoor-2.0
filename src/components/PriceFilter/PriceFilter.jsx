import React, { forwardRef, useImperativeHandle, useState } from "react";

export const PriceFilter = forwardRef(({ filterWorksPrice }, ref) => {
  const [min, setMin] = useState(0);
  const [on, setOn] = useState(false);
  const [max, setMax] = useState(99999999999);
  const show = 0;

  const ResetearPrecios = () => {
    setMin(0);
    setMax(99999999999);
    setOn(false);
  };

  useImperativeHandle(ref, () => ({
    ResetearPrecios,
  }));

  const handleMin = (event) => {
    const num = parseFloat(event.target.value.trim());
    setMin(num);
  };
  const handleMax = (event) => {
    !on ? setOn(true) : "";
    const num = parseFloat(event.target.value.trim());
    setMax(num);
  };
  const handleClick = () => {
    if (max > min) {
      filterWorksPrice(min, max);
    } else {
      filterWorksPrice(max, min);
    }
  };
  return (
    <div className=" flex flex-col   text-yellow-500 rounded">
      <div className="pb-1">Price Range</div>
      <div className="flex flex-row">
        <div className=" flex pr-1 ">
          <span className=" w-10 ">Min</span>
          <input
            type="number"
            value={min}
            onChange={handleMin}
            className="w-20 bg-gray-700"
          />
        </div>

        <div className="flex">
          <span className=" w-10 ">Max</span>
          <input
            type="number"
            value={on ? max : show}
            onChange={handleMax}
            className="w-20 bg-gray-700"
          />
        </div>
        <button
          type="button"
          onClick={() => handleClick()}
          className="inline-block mx-2 rounded bg-yellow-300 px-3 pb-1 pt-1.5 text-xs font-medium uppercase text-gray-900  ease-in-out hover:bg-yellow-500  "
        >
          Aplicar
        </button>
      </div>
    </div>
  );
});

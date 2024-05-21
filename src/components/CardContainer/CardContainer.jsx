import React from "react";
import { WorkCard } from "../WorkCard/WorkCard";

export const CardContainer = ({ worksData }) => {
  return (
    <div className="w-full bg-opacity-20 max-h-full overflow-y-auto">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 py-5 px-5">
        <div className="solo para prueba wea">
          <h1> HOLA MUNDO</h1>
          {worksData.map((card, index) => (
            <div key={index}> {card.created_at} </div>
          ))}
        </div>
      </div>
    </div>
  );
};

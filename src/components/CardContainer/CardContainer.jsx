import React from "react";
import { WorkCard } from "../WorkCard/WorkCard";

export const CardContainer = ({ worksData }) => {
  return (
    <div className="w-full bg-opacity-20 max-h-full overflow-y-auto">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 py-5 px-5">
        {worksData.map((card) => (
          <WorkCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

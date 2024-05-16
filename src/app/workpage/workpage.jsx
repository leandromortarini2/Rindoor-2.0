import { WorkPageCard } from "../../components/WorkPageCard/WorkPageCard";
import React from "react";
export const workpage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 flex justify-evenly flex-col items-center">
      <WorkPageCard />
    </div>
  );
};
export default workpage;

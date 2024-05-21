"use client";
import { WorkPageCard } from "../../../components/WorkPageCard/WorkPageCard";
import React, { useEffect, useState } from "react";
import { getWorkById } from "../../../helpers/helperWorksPage";
import Loader from "../../../components/Loader/Loader";
export default function page({ params }) {
  const [cardData, setCardData] = useState({});
  const [LoaderState, setLoaderState] = useState(true);
  useEffect(() => {
    getWorkById(params.worksId)
      .then((responseData) => {
        setCardData(responseData);
        setLoaderState(false);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 flex justify-evenly flex-col items-center">
      {LoaderState ? <Loader /> : <WorkPageCard cardData={cardData} />}
    </div>
  );
}

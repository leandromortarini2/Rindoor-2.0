"use client";

import { CardContainer } from "@/Components/CardContainer/CardContainer";
import { PriceFilter } from "@/Components/PriceFilter/PriceFilter";
import { Selector } from "@/Components/Selector/Selector";
import { SubNav } from "@/Components/SubNav/SubNav";
import React, { useEffect, useState } from "react";
import workCards from "./data";
import { getWorks } from "../../helpers/helperWorks";

const works = () => {
  const [worksDataOg, setWorksDataOg] = useState([]);
  const [worksData, setWorksData] = useState([]);
  const [params, setParams] = useState({});
  // "&categories=Fontaneria&categories=Electricidad&minPrice=0&maxPrice=10000";
  useEffect(() => {
    getWorks()
      .then((responseData) => {
        console.log(responseData);
        setWorksData(responseData);
        setWorksDataOg(responseData);
      })
      .catch((error) => console.error(error));
  }, []);
  // const setWorks1 = () => {
  //   setWorksData(worksDataOg);
  // };

  const filterWorksCategory = (cate) => {
    let params1 = params;
    params1.categories = cate;
    setParams(params1);
    getWorks(params1)
      .then((responseData) => {
        console.log(responseData);
        setWorksData(responseData);
      })
      .catch((error) => console.error(error));
  };
  const filterWorksPrice = (min = 0, max = 99999999) => {
    let params1 = params;
    params1.minPrice = min;
    params1.maxPrice = max;
    setParams(params1);
    console.log(params1);
    getWorks(params1)
      .then((responseData) => {
        console.log(responseData);
        setWorksData(responseData);
      })
      .catch((error) => console.error(error));
  };
  const resetData = () => {
    setWorksData(worksDataOg);
    setParams({});
  };

  return (
    <div className="bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300">
      <div>
        <div className="flex items-center justify-evenly">
          <SubNav
            filterWorksCategory={filterWorksCategory}
            filterWorksPrice={filterWorksPrice}
            resetData={resetData}
          />
          {/* setWorks1={setWorks1} */}
        </div>
        <div className="w-full min-h-screen bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 flex flex-col items-center">
          <div className="w-3/4 h-full top-0">
            <CardContainer worksData={worksData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default works;

"use client";

import { CardContainer } from "../../components/CardContainer/CardContainer";
import { PriceFilter } from "../../components/PriceFilter/PriceFilter";
import { Selector } from "../../components/Selector/Selector";
import { SubNav } from "../../components/SubNav/SubNav";
import React, { useEffect, useState } from "react";
import workCards from "./data";
import { getWorks } from "../../helpers/helperWorks";
import { WorksPageSelector } from "../../components/WorksPageSelector/WorksPageSelector";
import { wctest } from "../../components/WorkCard/dataTest";
import Loader from "../../components/Loader/Loader";
import { useSession } from "next-auth/react";

const Works = () => {
  const [worksDataOg, setWorksDataOg] = useState([]);
  const [worksData, setWorksData] = useState([]);
  const [params, setParams] = useState({});
  const [peishis, setPeishis] = useState(1);
  const [LoaderState, setLoaderState] = useState(true);
  const limitp = { limit: 999999999 };
  const { data: session } = useSession();
  useEffect(() => {
    console.log("rtarta", session);
  }, [session]);
  useEffect(() => {
    getWorks()
      .then((responseData) => {
        // Filtrar los trabajos que no están baneados
        const filteredWorks = responseData.filter((work) => !work.banned);
        setWorksData(filteredWorks);
        setWorksDataOg(filteredWorks);
      })
      .catch((error) => console.error(error));
    setLoaderState(false);
  }, []);

  const filterWorksCategory = (cate) => {
    let params1 = { ...params, categories: cate };
    setParams(params1);
    getWorks(params1)
      .then((responseData) => {
        console.log(
          "filterWorksCategory" + responseData + "filterWorksCategory"
        );
        // Filtrar los trabajos que no están baneados
        const filteredWorks = responseData.filter((work) => !work.banned);
        setWorksData(filteredWorks);
      })
      .catch((error) => console.error(error));
  };

  const filterWorksPrice = (min = 0, max = 99999999) => {
    let params1 = { ...params, minPrice: min, maxPrice: max };
    setParams(params1);
    console.log(params1);
    getWorks(params1)
      .then((responseData) => {
        console.log(responseData);
        // Filtrar los trabajos que no están baneados
        const filteredWorks = responseData.filter((work) => !work.banned);
        setWorksData(filteredWorks);
      })
      .catch((error) => console.error(error));
  };

  const resetData = () => {
    setWorksData(worksDataOg);
    setParams({});
  };

  const Pagination = (peich) => {
    let params1 = { ...params, page: peich };
    setParams(params1);
    getWorks(params1)
      .then((responseData) => {
        // Filtrar los trabajos que no están baneados
        const filteredWorks = responseData.filter((work) => !work.banned);
        setWorksData(filteredWorks);
      })
      .catch((error) => console.error(error));
  };

  const sortWorks = (sort) => {
    let { price, name, ...params1 } = params;
    params1 = { ...params1, [sort.key]: sort.value };
    console.log(params1);
    setParams(params1);
    console.log(params1);
    getWorks(params1)
      .then((responseData) => {
        // Filtrar los trabajos que no están baneados
        const filteredWorks = responseData.filter((work) => !work.banned);
        setWorksData(filteredWorks);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300">
      <div>
        <div>
          <SubNav
            filterWorksCategory={filterWorksCategory}
            filterWorksPrice={filterWorksPrice}
            resetData={resetData}
            sortWorks={sortWorks}
          />
        </div>
        <div className="w-full min-h-screen bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 flex flex-col items-center">
          <div className="lg:w-3/4 h-full top-0  bg-opacity-20 w-full">
            {LoaderState ? <Loader /> : <CardContainer worksData={worksData} />}
          </div>
          <WorksPageSelector Pagination={Pagination} />
        </div>
      </div>
    </div>
  );
};

export default Works;

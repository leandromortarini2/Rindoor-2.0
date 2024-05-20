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
import { Loader } from "../../components/Loader/Loader";
const works = () => {
  const [LoaderState, setLoaderState] = useState(true);
  const [worksDataOg, setWorksDataOg] = useState([]);
  const [worksData, setWorksData] = useState([]);
  const [params, setParams] = useState({});

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const responseData = await getWorks();
        setWorksData(responseData);
        setWorksDataOg(responseData);
        console.log("Categorías obtenidas: ", categoryData);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
      setLoaderState(false);
    };

    fetchWorks();
  }, []);
  // const setWorks1 = () => {
  //   setWorksData(worksDataOg);
  // };

  const filterWorksCategory = (cate) => {
    const fetchWorks1 = async (params) => {
      try {
        const responseData = await getWorks(params);
        setWorksData(responseData);
        console.log("Categorías obtenidas: ", categoryData);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
      setLoaderState(false);
    };
    let params1 = params;
    params1.categories = cate;
    setParams(params1);
    fetchWorks1(params1);
  };
  const filterWorksPrice = (min = 0, max = 99999999) => {
    const fetchWorks2 = async (params) => {
      try {
        const responseData = await getWorks(params);
        setWorksData(responseData);
        console.log("Categorías obtenidas: ", categoryData);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
      setLoaderState(false);
    };
    let params1 = params;
    params1.minPrice = min;
    params1.maxPrice = max;
    setParams(params1);
    console.log(params1);
    fetchWorks2(params1);
  };
  const resetData = () => {
    setWorksData(worksDataOg);
    setParams({});
  };
  const Pagination = (peich) => {
    const fetchWorks3 = async (params) => {
      try {
        const responseData = await getWorks(params);
        setWorksData(responseData);
        console.log("Categorías obtenidas: ", categoryData);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
      setLoaderState(false);
    };
    let params1 = params;
    params1.page = peich;
    setParams(params1);
    fetchWorks3(params1);
  };

  const sortWorks = (sort) => {
    const fetchWorks4 = async (params) => {
      try {
        const responseData = await getWorks(params);
        setWorksData(responseData);
        console.log("Categorías obtenidas: ", categoryData);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
      setLoaderState(false);
    };
    let params1 = params;
    params1[`${sort.key}`] = sort.value;
    setParams(params1);
    fetchWorks4(params);
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300">
        <div>
          <div>
            <SubNav
              filterWorksCategory={filterWorksCategory}
              filterWorksPrice={filterWorksPrice}
              sortWorks={sortWorks}
              resetData={resetData}
            />
          </div>
          <div className="w-full min-h-screen bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 flex flex-col items-center">
            <div className="lg:w-3/4 h-full top-0  bg-gray-400 bg-opacity-20 w-full">
              {LoaderState ? (
                <Loader />
              ) : (
                <CardContainer worksData={worksData} />
              )}
              <WorksPageSelector Pagination={Pagination} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default works;

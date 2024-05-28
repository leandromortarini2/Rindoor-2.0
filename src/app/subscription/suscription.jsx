"use client";
import {
  cancellSubscription,
  getSubscription,
  getUser,
  postSubscription,
} from "../../helpers/helperSubscription";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { useAuth } from "../context/Context";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";

const Subscription = () => {
  const { userData } = useAuth();

  const [userIdContext, setUserIdContext] = useState(null);
  const [plansState, setPlansState] = useState([]);
  const [LoaderState, setLoaderState] = useState(true);
  const [idPlanState, setIdPlanState] = useState(null);

  useEffect(() => {
    if (userData) {
      setUserIdContext(userData);
    }
    if (userData === "ban") {
      Swal.fire({
        title: "Usuario Banneado!",
        text: "Tu cuenta ha sido suspendida temporalmente debido a actividades que infringen nuestras políticas. Por favor, contáctanos para obtener más información y resolver esta situación lo antes posible.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      redirect("/")}
      
        if (!userData) {
          Swal.fire({
            title: "Espera!",
            text: "Para crear una publicacion debes completar tus datos",
            icon: "info",
            confirmButtonText: "Completar",
          });
          redirect("/update");
        }
     
  }, [userData]);

  useEffect(() => {
    const getUserData = async () => {
      if (userIdContext) {
        try {
          const id = userIdContext.subscriptionId;
          const user = await getUser(id);
          console.log("response getuser subscription--->", user);
          setIdPlanState(user);
        } catch (error) {
          console.log("error getting user data", error);
        }
      }
    };
    getUserData();
  }, [userIdContext]);

  useEffect(() => {
    const plansResponse = async () => {
      try {
        const data = await getSubscription();
        setPlansState(data);
      } catch (error) {
        console.log('error getting subscription plans', error);
      } finally {
        setLoaderState(false);
      }
    };
    plansResponse();
  }, []);

 

  const handleButton = async (planId) => {
    if (userIdContext) {
      try {
        setLoaderState(true);
        const userId = userIdContext.id;
        const data = await postSubscription({ planId, userId });
        console.log("data post", data.url);
        const url = data.url;
        window.location.href = url;
        setIdPlanState(planId);
      } catch (error) {
        console.log("error posting subscription", error);
      } finally {
        setLoaderState(false);
      }
    }
  };

  const handleCancellButton = async () => {
    try {
      setLoaderState(true);
      const id = userIdContext.id;
      const data = await cancellSubscription(id);
      console.log('subscription cancelled', data);
      window.location.href = '/subscription';
    } catch (error) {
      console.log("error cancelling subscription", error);
    } finally {
      setLoaderState(false);
    }
  };

  if (LoaderState) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-start items-center bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 ">
        <h1 className="text-gray-900 font-extrabold text-center text-3xl md:text-5xl mt-20 mb-20">
          Planes de Suscripción
        </h1>
        <div className="w-full flex flex-col md:flex-row justify-evenly items-center ">
          {idPlanState?.status === "active" ? (
            <div className="w-full md:w-[60%] md:h-[550px] flex items-center shadow-gray-900 shadow-xl bg-gray-900 rounded-xl mb-20">
              <div className="w-full md:h-[550px] h-[730px] flex flex-col md:flex-row">
                <div className="w-full m:w-1/2 h-[550px]">
                  <img
                    src="https://i.ibb.co/BBj9vvW/aaaaaaa.jpg"
                    alt=""
                    className="w-full h-full md:rounded-l-xl"
                  />
                </div>
                <div className="w-full m:w-1/2 h-[500px] flex flex-col justify-evenly items-center">
                  <>
                    <h3 className="text-yellow-300 text-lg md:text-2xl mt-5 font-bold">
                      ¡Felicidades!
                    </h3>
                    <h3 className="text-white text-lg md:text-lg mt-5 text-center font-semibold">
                      Tu suscripción fue realizada con éxito!!!
                    </h3>
                    <h3 className="text-white text-lg md:text-lg mt-5 text-center font-semibold">
                      Su vigencia es desde: <br />
                      <span className="text-yellow-300">
                        {idPlanState.current_period_start}
                      </span>
                    </h3>
                    <h3 className="text-white text-lg md:text-lg mt-5 text-center font-semibold">
                      La fecha de vencimiento es <br />
                      <span className="text-yellow-300">
                        {idPlanState.current_period_end}
                      </span>
                    </h3>
                    <button
                      onClick={handleCancellButton}
                      className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                    >
                      <svg
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                      Cancelar suscripción
                    </button>
                  </>
                </div>
              </div>
            </div>
          ) : (
            plansState?.map((plan) => {
              return (
                <div
                  className="w-3/4 sm:max-w-sm p-4 bg-gray-900 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 m-10"
                  key={plan.id}
                >
                  <h5 className="mb-4 text-sm sm:text-xl font-medium text-white">
                    Standard plan
                  </h5>
                  <div className="flex items-baseline text-yellow-500 ">
                    <span className=" text-3xl sm:text-5xl font-extrabold tracking-tight ">
                      {plan.price}
                    </span>
                    <span className=" text-xl sm:text-3xl font-semibold text-yellow-500">
                      {plan.currency}
                    </span>
                    <span className="ms-1 text-lg sm:text-xl font-normal text-white ">
                      /{plan.interval}
                    </span>
                  </div>
                  <ul role="list" className="space-y-5 my-7">
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-4 h-4 text-yellow-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <span className=" text-sm sm:text-base font-normal leading-tight text-white ms-3">
                        Access to unlimited jobs
                      </span>
                    </li>
                    <li className="flex">
                      <svg
                        className="flex-shrink-0 w-4 h-4 text-yellow-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <span className="text-sm sm:text-base font-normal leading-tight text-white  ms-3">
                        Featured profile in searches
                      </span>
                    </li>
                    <li className="flex">
                      <svg
                        className="flex-shrink-0 w-4 h-4 text-yellow-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <span className="text-sm sm:text-base font-normal leading-tight text-white ms-3">
                        Priority support
                      </span>
                    </li>
                    <li className="flex line-through decoration-gray-500">
                      <svg
                        className="flex-shrink-0 w-4 h-4 text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <span className="text-sm sm:text-base font-normal leading-tight text-gray-500 ms-3">
                        10% discount
                      </span>
                    </li>
                    <li className="flex line-through decoration-gray-500">
                      <svg
                        className="flex-shrink-0 w-4 h-4 text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <span className="text-sm sm:text-base font-normal leading-tight text-gray-500 ms-3">
                        Annual turnover
                      </span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                    onClick={() => handleButton(plan.id)}
                  >
                    Subscribe
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Subscription;

"use client";

<<<<<<< HEAD
import {
  getSubscription,
  getUser,
  postSubscription,
} from "../../helpers/helperSubscription";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";

export const suscription = () => {
  const [plansState, setPlansState] = useState([]);
  const [LoaderState, setLoaderState] = useState(true);
=======
import { cancellSubscription, getSubscription, getUser, postSubscription } from '../../helpers/helperSubscription';
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader';
import { useAuth } from "../context/Context";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";

export const suscription = () => {
  const { userData } = useAuth();


  const [userIdContext, setUserIdContext] = useState("");


  const [plansState, setPlansState] = useState();
  const [LoaderState, setLoaderState] = useState(true)
>>>>>>> 57bcbbbfd21f057756dbbd3de80e8dbd59ee7d7b

  const [idPlanState, setIdPlanState] = useState()

  // console.log('--------------> userIdContext', userIdContext)

  // const [userPlan, setUserPlan] = useState()
  useEffect(() => {
    if (!userData) {
      Swal.fire({
        title: "Espera!",
        text: "Antes de poder subscribirte debes completar tus datos",
        icon: "info",
        confirmButtonText: "Completar",
      });
      redirect("/update");
    }
  });

  // Actualizar el userId cada vez que userData cambie
  useEffect(() => {
    if (userData) {
      setUserIdContext(userData);
    }
  }, [userData]);
  
 
   

  useEffect(()=>{
 
    const getUserData = async () =>{
       if(userIdContext){
        
        try {
          const id = userIdContext.subcriptionId
          const user = await getUser(id)
          console.log('response getuser suscription--->', user)
          setIdPlanState(user)
          return user;
        }
        catch (error) {
          console.log('error  los datos del usuario', error)
        }
       }
      
    }
    getUserData()
  }, [userIdContext])
>>>>>>> 57bcbbbfd21f057756dbbd3de80e8dbd59ee7d7b

  useEffect(() => {
    const plansResponse = async () => {
      try {
<<<<<<< HEAD
        const data = await getSubscription();
        console.log(data);
        setPlansState(data);
      } catch (error) {
        console.log("error al traer los panes", error);
      } finally {
        setLoaderState(false);
=======
        const data = await getSubscription()
        // console.log('data getSubscription ---->', data)
        setPlansState(data)
      } catch (error) {
        // console.log('error al traer los panes', error)
      } finally{
        setLoaderState(false)
>>>>>>> 57bcbbbfd21f057756dbbd3de80e8dbd59ee7d7b
      }
    };
    plansResponse();
  }, []);

<<<<<<< HEAD
  const handleButton = async (planId) => {
    try {
      const userId = "e005b75d-7f40-4369-b1cf-d6218e843be4";
      setLoaderState(true);
      const dataPost = await postSubscription({ planId, userId });
      console.log("data suscripcion --------->", dataPost.url);
      const url = dataPost.url;
      window.location.href = url;
    } catch (error) {
      console.log("-------------->", error.message);
    } finally {
      setLoaderState(false);
    }
  };
=======
  const handleButton = async (planId) =>{
    if(userIdContext){
      try {
        setLoaderState(true)
        const userId = userIdContext.id
      const data = await postSubscription({planId, userId})
      console.log('data post', data.url)
      const url = data.url
      window.location.href = url
      setIdPlanState(planId)
    } catch (error) {
      console.log('error post', error)
    } finally {
      setLoaderState(false)
    }
    }
  }
>>>>>>> 57bcbbbfd21f057756dbbd3de80e8dbd59ee7d7b

  const handleCancellButton = async () => {
    try {
      setLoaderState(true)
      const id= 'e0a7c226-2d0c-49ad-965a-d76f73680f99'
      const data = await cancellSubscription(id)
      console.log('data cancelled suscripcion', data)
      window.location.href = '/subscription'
    } catch (error) {
      console.log('error al cancelar', error)
    } finally {
      setLoaderState(false)
    }
  }
  
   
  return (
    <>
<<<<<<< HEAD
      {LoaderState ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen flex flex-col justify-start items-center bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 ">
          <h1 className="text-gray-900 font-extrabold text-center text-3xl md:text-5xl mt-20 mb-20">
            Planes de Suscripcion
          </h1>
          <div className="w-full flex flex-col md:flex-row justify-evenly items-center ">
            {userPlan ? (
              <div className=" w-full md:w-[60%] h-[550px]  flex  items-center shadow-gray-900 shadow-xl   bg-gray-900 rounded-xl mb-20">
                <div className="w-full h-[550px] flex flex-col md:flex-row">
                  <div className="w-full m:w-1/2 h-[550px]">
                    <img
                      src="https://i.ibb.co/BBj9vvW/aaaaaaa.jpg"
                      alt=""
                      className="w-full h-full md:rounded-l-xl"
                    />
                  </div>
                  <div className="w-full m:w-1/2 h-[500px] flex flex-col justify-evenly items-center">
                    <h3 className="text-yellow-300 text-lg md:text-lg mt-5">
                      Estas suscripto al siguiente plan. <br /> La fecha de
                      vencimiento es: ../../....
                    </h3>
=======
    {LoaderState ? (<Loader/>) : (
    
    <div className="w-full min-h-screen flex flex-col justify-start items-center bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 ">
      <h1 className='text-gray-900 font-extrabold text-center text-3xl md:text-5xl mt-20 mb-20'>Planes de Suscripcion</h1>
      <div className='w-full flex flex-col md:flex-row justify-evenly items-center '>
      {
        idPlanState?.status === 'active' ? ( <div className=' w-full md:w-[60%] md:h-[550px]  flex  items-center shadow-gray-900 shadow-xl   bg-gray-900 rounded-xl mb-20'>
        <div className='w-full md:h-[550px] h-[730px] flex flex-col md:flex-row'>
          <div className='w-full m:w-1/2 h-[550px]'>
            <img src="https://i.ibb.co/BBj9vvW/aaaaaaa.jpg" alt="" className='w-full h-full md:rounded-l-xl'/>
          </div>
          <div className='w-full m:w-1/2 h-[500px] flex flex-col justify-evenly items-center'>
          {
            idPlanState ? (<> <h3 className='text-yellow-300 text-lg md:text-2xl mt-5 font-bold'>¡Felicidades! </h3> 
            <h3 className='text-white text-lg md:text-lg mt-5 text-center font-semibold'> Tu suscripcion fue realizada con exito!!! </h3> 
            <h3 className='text-white text-lg md:text-lg mt-5 text-center font-semibold'>Su vigencia es desde: <br /> <span className='text-yellow-300'>{idPlanState.current_period_start}</span> </h3>
            <h3 className='text-white text-lg md:text-lg mt-5 text-center font-semibold'> La fecha de vencimiento es <br /> <span className='text-yellow-300'>{idPlanState.current_period_end}</span> </h3>
            {/* ----------- */}
            <button onClick={handleCancellButton}
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
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
    ></path>
  </svg>

  Cancelar suscripcion
</button>

            {/* ----------- */}
            </>) : null
          }
            
          
          </div>
        </div>
        </div> ) :
        
          plansState?.map((plan)=>{
            return(
>>>>>>> 57bcbbbfd21f057756dbbd3de80e8dbd59ee7d7b

                    {plansState.map((plan) => {
                      if (plan.id === idPlanState) {
                        return (
                          <div
                            className="w-2/3 h-[400px] p-3 bg-gray-900 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-evenly items-center"
                            key={plan.id}
                          >
                            <h5 className="mb-4 text-sm sm:text-lg font-medium text-white ">
                              Standard plan
                            </h5>
                            <div className="flex items-baseline text-yellow-500 ">
                              <span className=" text-3xl sm:text-5xl font-extrabold tracking-tight ">
                                {plan.price}
                              </span>
                              <span className=" text-xl sm:text-2xl font-semibold text-yellow-500">
                                {plan.currency}
                              </span>
                              <span className="ms-1 text-lg sm:text-lg font-normal text-white ">
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
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            ) : (
              plansState.map((plan) => {
                return (
                  <div
                    className="w-3/4 sm:max-w-sm p-4 bg-gray-900 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 m-10 "
                    key={plan.id}
                  >
                    <h5 className="mb-4 text-sm sm:text-xl font-medium text-white ">
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

            {/* card uno */}
          </div>
        </div>
      )}
    </>
  );
};

<<<<<<< HEAD
export default suscription;
=======
export default suscription
>>>>>>> 57bcbbbfd21f057756dbbd3de80e8dbd59ee7d7b

"use client";

import { getSubscription, postSubscription } from '../../helpers/helperSubscription';
import React, { useEffect, useState } from 'react'

export const suscription = () => {

  const [plansState, setPlansState] = useState([]);

  useEffect(()=>{
    const plansResponse = async () => {
      try {
        const data = await getSubscription()
        console.log(data)
        setPlansState(data)
      } catch (error) {
        console.log('error al traer los panes', error)
      } 
    }

    plansResponse();
  },[])

  const handleButton = async (planId) => {
    try {
      const userId = 'a2d23355-eb4c-4fcd-8cb9-c0aaba337424'
    const dataPost = await postSubscription({planId, userId})
    console.log(dataPost.url);
    const url = dataPost.url
    window.location.href = url
    } catch (error) {
      console.log('-------------->',error.message)
    }
    
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 ">
      <div className='w-full flex flex-col md:flex-row justify-evenly items-center '>

        {/* card uno */}
        
        {
          plansState.map((plan)=>{
            return(

          <div className="w-3/4 sm:max-w-sm p-4 bg-gray-900 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 m-10 " key={plan.id}>
            <h5 className="mb-4 text-sm sm:text-xl font-medium text-white ">Standard plan</h5>
            <div className="flex items-baseline text-yellow-500 ">
              <span className=" text-3xl sm:text-5xl font-extrabold tracking-tight ">{plan.price}</span>
              <span className=" text-xl sm:text-3xl font-semibold text-yellow-500">{plan.currency}</span>
              <span className="ms-1 text-lg sm:text-xl font-normal text-white ">/{plan.interval}</span>
            </div>
            <ul role="list" className="space-y-5 my-7">
              <li className="flex items-center">
                <svg className="flex-shrink-0 w-4 h-4 text-yellow-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <span className=" text-sm sm:text-base font-normal leading-tight text-white ms-3"
                >Access to unlimited jobs</span>
              </li>
              <li className="flex">
                  <svg className="flex-shrink-0 w-4 h-4 text-yellow-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                  </svg>
                  <span className="text-sm sm:text-base font-normal leading-tight text-white  ms-3"
                  >
                  Featured profile in searches</span>
              </li>
              <li className="flex">
                <svg className="flex-shrink-0 w-4 h-4 text-yellow-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <span className="text-sm sm:text-base font-normal leading-tight text-white ms-3">Priority support</span>
              </li>
              <li className="flex line-through decoration-gray-500">
                <svg className="flex-shrink-0 w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <span className="text-sm sm:text-base font-normal leading-tight text-gray-500 ms-3">10% discount</span>
              </li>
              <li className="flex line-through decoration-gray-500">
                <svg className="flex-shrink-0 w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <span className="text-sm sm:text-base font-normal leading-tight text-gray-500 ms-3">Annual turnover</span>
              </li>
            </ul>
            <button type="button" className="text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center" onClick={() => handleButton(plan.id)}>Subscribe</button>
          </div>
           )
          })
        }

        {/* card uno */}        
      </div>
    </div>
  )
}

export default suscription
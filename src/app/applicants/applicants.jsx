"use client"
import React, { useEffect, useState } from 'react'
import {getApplicants} from '../../helpers/helperApplicants'
import Loader from '../../components/Loader/Loader'
import {arrayPostulantes} from '../../helpers/arrayPostulantes'

export const applicants = () => {

  const [LoaderState, setLoaderState] = useState(true);


  const [jobState, setJobState] = useState()
  console.log('jobState---->', jobState)
  const [jobStateClient, setJobStateClient] = useState()
  console.log('jobStateClient----------->', jobStateClient)
  const [jobStateProffesional, setJobStateProffesional] = useState()

  useEffect(()=>{
    const id = '3aa55085-3943-4e97-8a68-c4971ebccbf0'
    const getJobsById = async () =>{
      try {
        const data = await getApplicants(id)
        console.log(data, 'dataaaaaaaaaaaaa<<<<<<<------')
        setJobState(data)
        setJobStateClient(data.user)
      } catch (error) {
        console.log('error ---------->', error)
      } finally {
        setLoaderState(false)
      }
    }
    getJobsById()
  }, [])

  return (
    <>{
      LoaderState  ? (<Loader/>) : (<div className="w-full min-h-screen flex flex-col justify-start items-center bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-500 ">
        <div className='w-[80%] h-[1000px] flex flex-col my-10 bg-gray-900 items-center rounded-xl'>
            <div className='w-[80%] h-1/4 bg-gray-900  flex justify-evenly items-center'>
              <img src="https://i.ibb.co/k6yvRKP/logo2-Photoroom.png" alt="" className='w-[100px]'/>
              <div className='w-2/3 flex flex-col justify-evenly '>
                <h3 className='text-yellow-500 font-bold text-3xl text-center'>{jobState.name}</h3>
                <p className=' text-gray-300 text-center'>{jobState.description}</p>
                <p className=' text-gray-300 text-center'>Estado: {jobState.status}</p>
                <p className=' text-gray-300 text-center'>Precio: $ {jobState.base_price}</p>
                <p className=' text-gray-300 text-center'>Publicado desde: {jobState.created_at}</p>
              </div>
            </div>
            <div className='w-full h-3/4 bg-gray-800'>
              <div className="relative overflow-x-auto shadow-md ">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" className="px-6 py-3">
                                  Professional Name
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Ubication
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Category
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Price
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Rating
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  
                              </th>
                          </tr>
                      </thead>
                      {
                        arrayPostulantes?.map((postulante)=>{
                          return(
                            <tbody>
                          <tr key={postulante.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {postulante.name}
                              </th>
                              <td className="px-6 py-4">
                                  {postulante.province}
                              </td>
                              
                                  {postulante.categories?.map((category)=>{
                                    return(<td className="px-6 py-4">{category.name}</td>)
                                  })}
                              
                              <td className="px-6 py-4">
                                  $9.98
                              </td>
                              <td className="px-6 py-4">
                                  {postulante.rating}
                              </td>
                              <td className="px-6 py-4">
                                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Aceptar</a>
                              </td>
                          </tr>
                      </tbody>
                          )
                        })
                      }
                      
                  </table>
              </div>










              {/* ------------------------------------------------------ */}

{/* <div className="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-yellow-500 "></h5>
        <h5 className="text-xl font-bold leading-none text-yellow-500 ">Name</h5>
        <h5 className="text-xl font-bold leading-none text-yellow-500 ">Location</h5>
        <h5 className="text-xl font-bold leading-none text-yellow-500 ">Category</h5>
        <h5 className="text-xl font-bold leading-none text-yellow-500 ">Price</h5>
        <h5 className="text-xl font-bold leading-none text-yellow-500 ">Ranking</h5>
   </div>
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4 justify-center items-center">
                        <p className="text-sm font-medium text-gray-900   dark:text-white">
                            Agustina Sosa
                        </p>
                    </div>
                    <div className="flex-1 min-w-0 ms-4 justify-center items-center">
                        <p className="text-sm font-medium text-gray-900  dark:text-white">
                            Buenos Aires
                        </p>
                    </div>
                    <div className="flex-1 min-w-0 ms-4 justify-center items-center">
                        <p className="text-sm font-medium text-gray-900  dark:text-white">
                            Albañil
                        </p>
                    </div>
                    <div className="flex-1 min-w-0 ms-4 justify-center items-center">
                        <p className="text-sm font-medium text-gray-900  dark:text-white">
                        $320
                        </p>
                    </div>
                    <div className="flex-1 min-w-0 ms-4 justify-center items-center">
                        <p className="text-sm font-medium text-gray-900  dark:text-white">
                        $320
                        </p>
                    </div>
                    
                </div>
            </li>
            // {/* <li className="py-3 sm:py-4">
            //     <div className="flex items-center ">
            //         <div className="flex-shrink-0">
            //             <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
            //         </div>
            //         <div className="flex-1 min-w-0 ms-4">
            //             <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            //                 Bonnie Green
            //             </p>
            //             <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            //                 email@windster.com
            //             </p>
            //         </div>
            //         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            //             $3467
            //         </div>
            //     </div>
            // </li>
            // <li className="py-3 sm:py-4">
            //     <div className="flex items-center">
            //         <div className="flex-shrink-0">
            //             <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Michael image"/>
            //         </div>
            //         <div className="flex-1 min-w-0 ms-4">
            //             <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            //                 Michael Gough
            //             </p>
            //             <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            //                 email@windster.com
            //             </p>
            //         </div>
            //         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            //             $67
            //         </div>
            //     </div>
            // </li>
            // <li className="py-3 sm:py-4">
            //     <div className="flex items-center ">
            //         <div className="flex-shrink-0">
            //             <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Lana image"/>
            //         </div>
            //         <div className="flex-1 min-w-0 ms-4">
            //             <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            //                 Lana Byrd
            //             </p>
            //             <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            //                 email@windster.com
            //             </p>
            //         </div>
            //         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            //             $367
            //         </div>
            //     </div>
            // </li> */}
            {/* <li className="pt-3 pb-0 sm:pt-4">
                <div className="flex items-center ">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Thomas image"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Thomes Lean
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        $2367
                    </div>
                </div>
            </li>
        </ul> */}
   {/* </div>
</div>  */}
            </div>
        </div>
    </div>)
    }
    </>
    
    
  )
}

export default applicants;

// los trabajos deben tener: imagen, titulo, estado, ubicacion, precio, fecha.
// los profesionales deben teer: nombre, rating, boton de aceptar, categorias, foto. 
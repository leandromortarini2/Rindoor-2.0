"use client";
import React, { useEffect, useState } from 'react';
import { getJobIdMyPosts, getJobsMyPosts, postUserChat, putJobFinish, putPostulationsClose } from '../../helpers/helperApplicants';
import Loader from '../../components/Loader/Loader';
import { useAuth } from '../context/Context';
import Swal from "sweetalert2";
import Link from 'next/link';

export const myposts = () => {
  const { userData } = useAuth();
  const [userDataState, setUserDataState] = useState(null);
  const [loaderState, setLoaderState] = useState(true);
  const [jobState, setJobState] = useState([]);
  console.log(jobState, 'jobstate')
  const [jobStateProffesional, setJobStateProffesional] = useState({ postulante: null, job: null });

  const [stateJobFilter, setStateJobFilter] = useState(null)
  console.log(stateJobFilter, 'stateJobFilter')

  useEffect(() => {
    if (userData === null) {
      setLoaderState(true);
    } else {
      setUserDataState(userData);
      setLoaderState(false);
    }
  }, [userData]);

  useEffect(() => {
    const getJobsById = async () => {
      try {
        setLoaderState(true);
        const jobs = await getJobsMyPosts();
  
        const jobsWithDetails = await Promise.all(
          jobs.map(async (job) => {
            const jobDetails = await getJobIdMyPosts(job.id);
            return jobDetails;
          })
        );
  
        // Filtrar trabajos con la propiedad 'banned' establecida en 'false'
        const filteredJobs = jobsWithDetails.filter(job => !job.banned);
  
        setJobState(filteredJobs);
      } catch (error) {
        console.log('error ---------->', error);
      } finally {
        setLoaderState(false);
      }
    };
    getJobsById();
  }, []);
  

  const handleButtonAccept = async (postulante, job, postulationId) => {
    const dataAcept = {
      postulationId: postulationId,
      userId: userDataState.id,
    };
    const dataChat = {
      idUser: userDataState.id,
      idContact: postulante.id,
    }
    
    try {
      setLoaderState(true);
      setJobStateProffesional({ postulante, job });
      const data = await putPostulationsClose(dataAcept);
      const dataPostChat = await postUserChat(dataChat)
      Swal.fire({
        title: "¡Has seleccionado con exito al profesional!",
        text: "Gracias por seguir eligiendo Rin|Door. Ahora puedes chatear con el profesional.",
        icon: "success",
        confirmButtonText: "Cool",
      });
      console.log(dataPostChat, '::::::::::::::::dataPostChat')
      window.location.href= '/chat'
    } catch (error) {
      console.log('error buttonAccept ---->', error);
    } finally {
      setLoaderState(false);
    }
  };

  const handleButtonJobFinish = async (jobId) => {
    const dataJob = {
      jobId: jobId,
      userId: userDataState.id,
    };
    console.log(jobId,'{',dataJob,'}', 'AAAAAAAAAAAAAAAA')

    try {
      const data = await putJobFinish(dataJob);
      console.log(data, '<<<<<<<<<<<<-------------------- D A T A JOBFINISH ');
      Swal.fire({
        title: "!El trabajo se ha finalizado con exito!",
        text: "Gracias por seguir eligiendo Rin|Door",
        icon: "success",
        confirmButtonText: "Cool",
      });
      window.location.href = "/myposts";
    } catch (error) {
      console.log(error, 'error jobfinish');
    }
  };


  useEffect(()=>{
    // Filtrar trabajos según el estado
    const filteredJobs = jobState.filter(job => job.status === 'active' || job.status === 'InProgress' );
    const arrayJob = filteredJobs.filter( job => job.client.id === userDataState?.id)
    setStateJobFilter(arrayJob)
    
  },[jobState])
  
  

  return (
    <>
      {loaderState ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-500">
          {
          stateJobFilter?.length > 0 ? (
            stateJobFilter?.map((job) => {
                  if (job) {
                    return (
                      <div className="w-[80%] flex flex-col my-10 bg-gray-900 items-center rounded-xl" key={job.id}>
                        <div className="w-[80%] min-h-1/4 bg-gray-900 flex flex-col sm:flex-row justify-evenly items-center">
                          <img src={job.img} alt="" className="w-[80%] sm:w-[100px] my-2" />
                          <div className="w-[90%] md:w-2/3 flex flex-col justify-evenly">
                            <h3 className="text-yellow-500 font-bold text-2xl md:text-3xl text-center uppercase">{job.name}</h3>
                            <p className="text-gray-300 text-center">{job.description}</p>
                            <p className="text-gray-300 text-center">Estado: {job.status}</p>
                            <p className="text-gray-300 text-center">Precio: $ {job.base_price}</p>
                            <p className="text-gray-300 text-center">Publicado desde: {job.created_at}</p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-800 rounded-b-xl flex flex-col">
                          {job.postulations && job.postulations.length > 0 ? (
                            job.postulations.some(postulation => postulation.status === 'open') ? (
                              <div className="w-full relative overflow-x-auto shadow-md rounded-b-xl">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                      <th scope="col" className="px-6 py-3">Professional Name</th>
                                      <th scope="col" className="px-6 py-3">Ubication</th>
                                      <th scope="col" className="px-6 py-3">Category</th>
                                      <th scope="col" className="px-6 py-3">Price</th>
                                      <th scope="col" className="px-6 py-3">Rating</th>
                                      <th scope="col" className="px-6 py-3"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {job.postulations.map((postulante) => (
                                      postulante.status === 'open' && (
                                        <tr key={postulante.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {postulante.user.name}
                                          </th>
                                          <td className="px-6 py-4">{postulante.user.city}</td>
                                          <td className="px-6 py-4">
                                            {postulante.user.categories?.map((category) => (
                                              <p key={category.id}>{category.name}</p>
                                            ))}
                                          </td>
                                          <td className="px-6 py-4">{postulante.offered_price}</td>
                                          <td className="px-6 py-4">{postulante.user.rating}</td>
                                          <td className="px-6 py-4">
                                            {userDataState.role === 'CLIENT' ? (
                                              <button
                                                type="button"
                                                className="text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                                                onClick={() => handleButtonAccept(postulante.user, job, postulante.id)}
                                              >
                                                Aceptar
                                              </button>
                                            ) : (
                                              <button
                                                type="button"
                                                className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                                              >
                                                Eliminar Postulacion
                                              </button>
                                            )}
                                          </td>
                                        </tr>
                                      )
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              job.postulations.some(postulation => postulation.status === 'closed') && (
                                job.postulations.map((postulation) => (
                                  postulation.status === 'closed' && (
                                    <div className="w-full flex flex-col items-center p-4" key={postulation.id}>
                                      <h1 className="text-yellow-600 font-bold text-xl text-center">Profesional elegido:</h1>
                                      <h2 className="text-yellow-500 font-bold text-2xl text-center">{postulation.user.name}</h2>
                                      <p className="text-gray-300">Ciudad: {postulation.user.city}</p>
                                      <div className="w-full flex flex-wrap justify-evenly text-gray-300">
                                        Categorias:
                                        {postulation.user.categories.map((category) => (
                                          <p key={category.id}>{category.name}</p>
                                        ))}
                                      </div>
                                      <p className="text-gray-300">Email: {postulation.user.email}</p>
                                      <p className="text-gray-300">Telefono: {postulation.user.phone}</p>
                                      <p className="text-gray-300">Rating: {postulation.user.rating}</p>
                                      <div className="w-full flex justify-center mt-4">
                                        <button
                                          type="button"
                                          className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                                          onClick={() => handleButtonJobFinish(job.id)}
                                        >
                                          Finish Job
                                        </button>
                                      </div>
                                    </div>
                                  )
                                ))
                              )
                            )
                          ) : (
                            <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                  <tr>
                                    <th scope="col" className="px-6 py-3">No hay postulaciones</th>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  } 
                  ;
                })
              ) : (
                  <div className='w-[90%] sm:w-2/3 min-h-[400px] md:min-h-[200px] md:h-44 bg-gray-900 flex flex-col justify-evenly items-center rounded-xl shadow-gray-800 shadow-xl'>
                    <h2 className="text-yellow-400 text-xl md:text-3xl font-bold text-center">No hay trabajos disponibles</h2>
                    <p className='text-white text-center text-lg md:text-xl'>Aun no tienes ningun trabajo creado. Haz click en el boton y completa el formulario.</p>
                    <Link href='/createjob'><button className="text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Create new job</button></Link>
                  </div>
               
              )
          }
          
        </div>
      )}
    </>
  );
};

export default myposts;

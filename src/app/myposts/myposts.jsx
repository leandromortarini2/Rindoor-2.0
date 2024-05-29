"use client"
import React, { useEffect, useState } from 'react'
import { getJobIdMyPosts, getJobsMyPosts, putJobFinish } from '../../helpers/helperApplicants'
import Loader from '../../components/Loader/Loader'
import { useAuth } from '../context/Context'
import Link from 'next/link'

export const myposts = () => {
  const { userData } = useAuth()
  const [userDataState, setUserDataState] = useState(null)
  console.log(userDataState, 'userDataStateuserDataState')
  const [loaderState, setLoaderState] = useState(true)
  const [jobState, setJobState] = useState([])
  console.log(jobState, '------>>>>jobState')
  const [jobStateProffesional, setJobStateProffesional] = useState({ postulante: null, job: null })

  useEffect(() => {
    if (userData === null) {
      setLoaderState(true)
    } else {
      setUserDataState(userData)
      setLoaderState(false)
    }
  }, [userData])

  useEffect(() => {
    const getJobsById = async () => {
      try {
        setLoaderState(true)
        const jobs = await getJobsMyPosts()
        // console.log(jobs, 'dataaaaaaaaaaaaa<<<<<<<------')

        const jobsWithDetails = await Promise.all(jobs.map(async (job) => {
          const jobDetails = await getJobIdMyPosts(job.id)
          return jobDetails 
        }))

        setJobState(jobsWithDetails)
      } catch (error) {
        console.log('error ---------->', error)
      } finally {
        setLoaderState(false)
      }
    }
    getJobsById()
  }, [])

  const handleButtonAccept = (postulante, job) => {
    try {
      setLoaderState(true)
      // console.log('id buttonAccept---->', postulante, job)
      setJobStateProffesional({ postulante, job })
    } catch (error) {
      console.log('error buttonAccept ---->', error)
    } finally {
      setLoaderState(false)
    }
  }

  const handleButtonJobFinish = async (jobId, userId) => {
    console.log(jobId, userId, '#########################')
    const dataJob= {
      jobId: jobId,
      userId: userId
    }
    try {
      const data = await putJobFinish(dataJob)
      console.log(data, '<<<<<<<<<<<<-------------------- D A T A JOBFINISH ')
    } catch (error) {
      console.log(error, 'error jobfinish')
    }
  }
 

  return (
    <>
      {loaderState ? (<Loader />) : (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-500 ">
          {userDataState ? (
            jobState.length > 0 ? (
              jobState.map((job) => {
                if (job.client.id === userDataState.id) {
                  return (
                    <div className='w-[80%] flex flex-col my-10 bg-gray-900 items-center rounded-xl' key={job.id}>
                      <div className='w-[80%] min-h-1/4 bg-gray-900 flex flex-col sm:flex-row justify-evenly items-center'>
                        <img src={job.img} alt="" className=' w-[80%] sm:w-[100px] my-2' />
                        <div className=' w-[90%] md:w-2/3 flex flex-col justify-evenly '>
                          <h3 className='text-yellow-500 font-bold text-2xl md:text-3xl text-center  uppercase'>{job.name}</h3>
                          <p className=' text-gray-300 text-center'>{job.description}</p>
                          <p className=' text-gray-300 text-center'>Estado: {job.status}</p>
                          <p className=' text-gray-300 text-center'>Precio: $ {job.base_price}</p>
                          <p className=' text-gray-300 text-center'>Publicado desde: {job.created_at}</p>
                        </div>
                      </div>
                      <div className='w-full bg-gray-800 rounded-b-xl flex '>
                        {jobStateProffesional.job?.id === job.id ? (
                          <div className='w-full flex  items-center'>
                            <div className='w-2/3  flex flex-col  items-center'>
                              <h1 className='text-yellow-600 font-bold text-xl text-center'>Profesional elegido:</h1>
                              <h2 className='text-yellow-500 font-bold text-2xl text-center'>{jobStateProffesional.postulante.name}</h2>
                              <p className='text-gray-300'>Ciudad: {jobStateProffesional.postulante.city}</p>
                              <div className='w-1/3 flex flex-wrap justify-evenly text-gray-300'> Categorias: 
                                {jobStateProffesional.postulante.categories.map((category) => {
                                  return (<p key={category.id}>{category.name}</p>)
                                })}
                              </div>
                              <p className='text-gray-300'>Email: {jobStateProffesional.postulante.email}</p>
                              <p className='text-gray-300'>Telefono: {jobStateProffesional.postulante.phone}</p>
                              <p className='text-gray-300'>Rating: {jobStateProffesional.postulante.rating}</p>
                            </div>
                            <div className='w-1/4'>
                              <button type="button" className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center" onClick={()=>{ handleButtonJobFinish(jobStateProffesional.job.id, jobStateProffesional.postulante.id)}}>Finish Job</button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full relative overflow-x-auto shadow-md rounded-b-xl">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
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
                              {job.postulations && job.postulations.length > 0 ? (
                                job.postulations.map((postulante) => (
                                  <tbody key={postulante.id}>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{postulante.user.name}</th>
                                      <td className="px-6 py-4">{postulante.user.city}</td>
                                      <td className="px-6 py-4">
                                        {postulante.user.categories?.map((category) => (
                                          <p key={category.id}>{category.name}</p>
                                        ))}
                                      </td>
                                      <td className="px-6 py-4">{postulante.offered_price}</td>
                                      <td className="px-6 py-4">{postulante.user.rating}</td>
                                      <td className="px-6 py-4">
                                        {
                                          userDataState.role === 'CLIENT' ? (<button type="button"
                                          className="text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                                          onClick={() => { handleButtonAccept(postulante.user, job) }}>
                                          Aceptar
                                        </button>) : ( <button type="button"
                                          className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                                          onClick={''}>
                                          Eliminar Postulacion
                                        </button>)
                                        }
                                      </td>
                                    </tr>
                                  </tbody>
                                ))
                              ) : (
                                <tbody>
                                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Aún no hay postulantes</td>
                                  </tr>
                                </tbody>
                              )}
                            </table>
                            {/* --------------------------------- */}
                            {

                            }
                            {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
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
                              {job.postulations && job.postulations.length > 0 ? (
                                job.postulations.map((postulante) => (
                                  <tbody key={postulante.id}>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{postulante.user.name}</th>
                                      <td className="px-6 py-4">{postulante.user.city}</td>
                                      <td className="px-6 py-4">
                                        {postulante.user.categories?.map((category) => (
                                          <p key={category.id}>{category.name}</p>
                                        ))}
                                      </td>
                                      <td className="px-6 py-4">{postulante.offered_price}</td>
                                      <td className="px-6 py-4">{postulante.user.rating}</td>
                                      <td className="px-6 py-4">
                                        <button type="button"
                                          className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                                          onClick={''}>
                                          Eliminar Postulacion
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                ))
                              ) : (
                                <tbody>
                                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Aún no hay postulantes</td>
                                  </tr>
                                </tbody>
                              )}
                            </table> */}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                }
                return null; // return null for jobs not matching the user ID
              })
            ) : (
              <div className='w-full min-h-screen flex flex-col justify-start items-center'>
                <img src="https://images-ext-1.discordapp.net/external/b88xtpwXUOtoZ2uXbYlvcGwFkQZ_IMzTfx6KC9oiuf0/https/res.cloudinary.com/dtwiog6cy/image/upload/v1715277145/Proyecto%2520FInal/ltpvsdwg7xfds7fzm1ho.png?format=webp&quality=lossless&width=705&height=258" alt="" className=" w-56 sm:w-64 xl:w-72 ShadowEffect z-0" />
                <div className='w-2/3 min-h-[200px] bg-gray-800 rounded-xl flex flex-col justify-evenly items-center mt-20 shadow-xl shadow-gray-700'>
                  <h2 className=' text-xl font-bold'>You still don't have publications created</h2>
                  <p>Click on the next button to create a new publication.</p>
                  <Link href='/createjob'>
                    <button className="w-[130px] h-[40px] xl:text-xl text-gray-700 border p-1 block rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700 hover:text-yellow-500 mt-3 mb-3 disabled:bg-gray-500 hover:disabled:text-gray-700"> Create Post
                    </button>
                  </Link>
                </div>
              </div>
            )
          ) : null}
        </div>
      )}
    </>
  )
}

export default myposts

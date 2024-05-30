"use client";

import React, { useEffect, useState } from "react";
import { banPost, getPosts } from "../../../helpers/adminUsers";
import { MenuAdmin } from "../../../components/MenuAdmin/MenuAdmin";
import Swal from "sweetalert2";
import { useAuth } from "../../context/Context";
import { redirect } from "next/navigation";
import { PaginacionPost } from "../../../components/PaginacionPost/PaginacionPost";
import Loader from "../../../components/Loader/Loader";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [LoaderState, setLoaderState] = useState(true);
  const postsPerPage = 5; // Ajusta este número según sea necesario

  const { userData } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      const checkUserRole = () => {
        setLoaderState(true);
        try {
          if (userData?.role !== "ADMIN") {
            Swal.fire({
              title: "Alto!",
              text: "El acceso negado",
              icon: "error",
              confirmButtonText: "Completar",
            }).then(() => {
              redirect("/");
            });
          }
        } finally {
          setLoaderState(false);
        }
      };
      checkUserRole();
    }, 1000); // Esperar 1 segundo antes de verificar

    return () => clearTimeout(timer); // Limpiar el temporizador en el desmontaje
  }, [userData]);
  useEffect(() => {
    const fetchGetPosts = async () => {
      setLoaderState(true);
      try {
        const newposts = await getPosts();
        console.log("Publicaciones obtenidas:", newposts); // Verifica los datos recibidos
        setPosts(newposts);
        setTotalPages(Math.ceil(newposts.length / postsPerPage));
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        setError("Error al obtener publicaciones.");
      } finally {
        setLoaderState(false);
      }
    };
    fetchGetPosts();
  }, []);

  const handleBan = async (id) => {
    setLoaderState(true);
    try {
      const response = await banPost(id);
      console.log(response);
      if (response.status === 200 || response.banned) {
        Swal.fire({
          title: "Ban!",
          text: "Publicación baneada con éxito",
          icon: "success",
          confirmButtonText: "Cool",
        }).then(() => {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === id ? { ...post, banned: true } : post
            )
          ); // Actualiza el estado para establecer el campo banned en true
        });
      } else {
        throw new Error("No se pudo banear la publicación");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "No se pudo banear la publicación",
        icon: "error",
        confirmButtonText: "Cool",
      });
    } finally {
      setLoaderState(false);
    }
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  if (error) {
    return (
      <p className="text-2xl text-red-600 font-semibold capitalize">{error}</p>
    );
  }
  return (
    <>
      {LoaderState ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 flex flex-col items-center ">
          <MenuAdmin />
          <div className="w-3/4 h-14 md:w-1/2 lg:h-20 bg-gray-500 flex justify-center items-center m-5 rounded-3xl">
            <h2 className="text-xl lg:text-3xl text-gray-900 font-bold text-center capitalize">
              Publicaciones de trabajo
            </h2>
          </div>

          <div className="w-full flex flex-col md:flex-row flex-wrap items-center justify-center">
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map((post) => (
                <div
                  key={post.id}
                  className="w-3/4 md:w-1/3 h-[500px] m-5 flex flex-col justify-evenly items-center bg-gray-900 border border-gray-900 rounded-2xl p-2 "
                >
                  <p className="text-lg lg:text-xl text-white font-semibold capitalize m-2 text-center">
                    {post.name}
                  </p>

                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize text-center">
                    Description:
                    <span className="text-white"> {post?.description}</span>
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize">
                    Base price:
                    <span className="text-white"> {post?.base_price}</span>
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize">
                    Country:
                    <span className="text-white"> {post?.country}</span>
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize">
                    Province:
                    <span className="text-white"> {post?.province}</span>
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize">
                    City:
                    <span className="text-white"> {post?.city}</span>
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize">
                    Address:
                    <span className="text-white"> {post?.address}</span>
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize">
                    banned:{" "}
                    {post?.banned === true ? (
                      <span className="text-white">true</span>
                    ) : (
                      <span className="text-white">false</span>
                    )}
                  </p>
                  <div className="w-full flex justify-evenly ">
                    <button
                      onClick={() => handleBan(post.id)}
                      disabled={post?.banned === true}
                      className="w-1/4 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold duration-1000 bg-red-500 hover:bg-red-900 hover:text-red-500 m-3 capitalize disabled:bg-slate-800 disabled:text-slate-500"
                    >
                      Ban
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-2xl text-white font-semibold capitalize">
                No hay publicaciones disponibles
              </p>
            )}
          </div>

          <PaginacionPost
            Pagination={handlePagination}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </>
  );
};

export default Post;

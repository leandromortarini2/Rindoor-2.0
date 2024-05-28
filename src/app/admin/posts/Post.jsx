"use client";

import React, { useEffect, useState } from "react";
import { banPost, getPosts } from "../../../helpers/adminUsers";
import { MenuAdmin } from "../../../components/MenuAdmin/MenuAdmin";
import Swal from "sweetalert2";
import { useAuth } from "../../context/Context";
import { redirect } from "next/navigation";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const { userData } = useAuth();

  useEffect(() => {
    if (userData?.role !== "ADMIN") {
      Swal.fire({
        title: "Alto!",
        text: "El acceso negado",
        icon: "error",
        confirmButtonText: "Completar",
      });
      redirect("/");
    }
  }, [userData]);

  useEffect(() => {
    const fetchGetPosts = async () => {
      try {
        const newposts = await getPosts();
        console.log("Publicaciones obtenidas:", newposts); // Verifica los datos recibidos
        setPosts(newposts);
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        setError("Error al obtener publicaciones.");
      }
    };
    fetchGetPosts();
  }, []);

  const handleBan = async (id) => {
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
    }
  };

  if (error) {
    return (
      <p className="text-2xl text-red-600 font-semibold capitalize">{error}</p>
    );
  }
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 flex flex-col items-center ">
      <MenuAdmin />
      <div className="w-1/2 h-20 bg-gray-500 flex justify-center items-center m-5 rounded-3xl">
        <h2 className="text-3xl text-gray-900 font-bold text-center capitalize">
          publicaciones de trabajo
        </h2>
      </div>

      <div className="w-full flex flex-wrap items-center justify-center">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="w-1/3 h-[400px] m-5 flex flex-col justify-evenly items-center bg-gray-900 border border-gray-900 rounded-2xl p-2 "
            >
              <p className="text-xl text-white font-semibold capitalize m-2 text-center">
                {post.name}
              </p>

              <p className="text-md text-gray-500 font-semibold capitalize text-center">
                description:
                <span className="text-white">{post?.description}</span>
              </p>
              <p className="text-mm text-gray-500 font-semibold capitalize">
                base price:
                <span className="text-white">{post?.base_price}</span>
              </p>
              <p className="text-lg text-gray-500 font-semibold capitalize">
                status:
                <span className="text-white">{post?.status}</span>
              </p>
              <p className="text-md text-gray-500 font-semibold capitalize">
                user:
                <span className="text-white">{post?.user?.name}</span>
              </p>
              <p className="text-sm text-gray-500 font-semibold capitalize text-center">
                userID:
                <span className="text-white lowercase">{post?.user?.id}</span>
              </p>
              <div className="w-full flex justify-evenly ">
                <button
                  onClick={() => handleBan(post.id)}
                  disabled={post?.banned === true}
                  className="w-1/4 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-red-500 hover:bg-red-900  hover:text-red-500 m-3 capitalize disabled:bg-slate-800 disabled:text-slate-500"
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
    </div>
  );
};

export default Post;

"use client";
import React, { useEffect, useState } from "react";
import { getUsers, banUser } from "../../../helpers/adminUsers";
import Swal from "sweetalert2";
import { MenuAdmin } from "../../../components/MenuAdmin/MenuAdmin";
import { PaginacionUsers } from "../../../components/PaginacionUsers/PaginacionUsers";
import { useAuth } from "../../context/Context";
import { redirect } from "next/navigation";
import Loader from "../../../components/Loader/Loader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [LoaderState, setLoaderState] = useState(true);

  const { userData } = useAuth();

  useEffect(() => {
    try {
      setLoaderState(true);

      if (userData?.role !== "ADMIN") {
        Swal.fire({
          title: "Alto!",
          text: "El acceso negado",
          icon: "error",
          confirmButtonText: "Completar",
        });
        redirect("/");
      }
    } finally {
      setLoaderState(false); //agregale seguido del catch, este finally
    }
  }, [userData]);

  useEffect(() => {
    try {
      setLoaderState(true);
      const fetchGetUsers = async () => {
        const users = await getUsers(currentPage, 10); // Adjust 10 according to your desired page size
        setUsers(users);
        console.log(users);
      };
      fetchGetUsers();
    } finally {
      setLoaderState(false); //agregale seguido del catch, este finally
    }
  }, [currentPage]);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };
  const handleBanned = async (id) => {
    try {
      const response = await banUser(id);

      Swal.fire({
        title: "Baneado!",
        text: "Usuario baneado con éxito",
        icon: "success",
        confirmButtonText: "Cool",
      });
      console.log(">>>>>>>>>>>", response);

      // window.location.href = "/admin/users";
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "No se pudo banear el usuario",
        icon: "error",
        confirmButtonText: "Cool",
      });
    } finally {
      setLoaderState(false); //agregale seguido del catch, este finally
    }
  };

  return (
    <>
      {LoaderState ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 flex flex-col items-center">
          <MenuAdmin />
          <div className="w-1/2 h-14 lg:w-1/2 lg:h-20 bg-gray-500 flex justify-center items-center m-5 rounded-3xl">
            <h2 className="text-3xl text-gray-900 font-bold text-center capitalize">
              Usuarios
            </h2>
          </div>
          <div className="w-full flex flex-col lg:flex-row  flex-wrap items-center justify-center">
            {users?.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className="w-3/4 lg:w-1/3 lg:min-h-[650px] m-5 flex flex-col justify-evenly items-center bg-gray-900 border border-gray-900 rounded-2xl pt-3 pb-3 text-center"
                >
                  <p className=" lg:text-2xl text-white font-semibold capitalize m-2 ">
                    {user.name}
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 lg:font-semibold capitalize p-2 ">
                    Email: <span className="text-white">{user.email}</span>
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize p-2">
                    Phone: <span className="text-white">{user.phone}</span>
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize p-2">
                    Country: <span className="text-white">{user.country}</span>
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize p-2">
                    Province:{" "}
                    <span className="text-white">{user.province}</span>
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize p-2">
                    Address: <span className="text-white">{user.address}</span>
                  </p>
                  <p className=" font-medium lowercase text-sm lg:text-md text-gray-500">
                    {user.role}
                  </p>
                  {Array.isArray(user.categories) ? (
                    user.categories.map((category) => (
                      <div key={category.id} className="flex">
                        <p className="text-sm lg:text-md">{category.name}</p>
                      </div>
                    ))
                  ) : (
                    <p>{user.categories}</p>
                  )}
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize p-2">
                    Rating: <span className="text-white">{user.rating}</span>
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize p-2">
                    isActive:{" "}
                    {user.isActive === false ? (
                      <span className="text-white">banned</span>
                    ) : (
                      <span className="text-white">true</span>
                    )}
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize p-2">
                    ID user: <span className="text-white">{user.id}</span>
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize p-2">
                    ID Plan: <span className="text-white">{user.planId}</span>
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 font-semibold capitalize p-2">
                    ID Subscription:
                    <span className="text-white">{user.subscriptionId}</span>
                  </p>
                  <div className="w-full flex justify-evenly">
                    <button
                      onClick={() => handleBanned(user.id)}
                      disabled={user?.isActive === false}
                      className="w-1/4 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold duration-1000 bg-red-500 hover:bg-red-900 hover:text-red-500 m-3 capitalize disabled:bg-gray-700 disabled:text-gray-500"
                    >
                      ban
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm lg:text-3xl font-bold text-red-500">
                No users found.
              </p>
            )}
          </div>
          <PaginacionUsers Pagination={handlePagination} />{" "}
        </div>
      )}
    </>
  );
};

export default Users;

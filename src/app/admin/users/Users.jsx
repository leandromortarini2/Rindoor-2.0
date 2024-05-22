"use client";
import React, { useEffect, useState } from "react";
import { getUsers } from "../../../helpers/adminUsers";
import { deleteUsers } from "../../../helpers/adminUsers";
import Swal from "sweetalert2";

const URL_USERS = process.env.NEXT_PUBLIC_API_URL_USERS;

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchGetUsers = async () => {
      const users = await getUsers();
      // console.log("+++++++++++++++++++++???????????", users);
      setUsers(users);
    };
    fetchGetUsers();
  }, []);

  const handleDelete = (id) => {
    try {
      const deleteUser = deleteUsers(id);
      if (!id) {
        Swal.fire({
          title: "eliminado!",
          text: "usuario eliminado con exito",
          icon: "success",
          confirmButtonText: "Cool",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "No se pudo eliminar el usuario",
          icon: "error",
          confirmButtonText: "Cool",
        });
      }

      // window.location.href = "/admin/users";
    } catch (error) {
      if (id) {
        Swal.fire({
          title: "Error!",
          text: "No se pudo eliminar el usuario",
          icon: "error",
          confirmButtonText: "Cool",
        });
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 flex flex-wrap  items-center justify-center">
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user.id}
            className="w-1/3 h-[400px] m-5 flex flex-col justify-evenly items-center  bg-gray-900  border border-gray-900 rounded-2xl pt-3 pb-3"
          >
            <p className="text-2xl text-white font-semibold capitalize m-2">
              {user.name}
            </p>
            <p className="text-lg text-gray-500 font-semibold capitalize">
              Email: <span className="text-white">{user.email}</span>{" "}
            </p>
            <p className="text-lg text-gray-500 font-semibold capitalize">
              phone: <span className="text-white">{user.phone}</span>{" "}
            </p>

            <p className="text-lg text-gray-500 font-semibold capitalize">
              country: <span className="text-white">{user.country}</span>{" "}
            </p>
            <p className="text-lg text-gray-500 font-semibold capitalize">
              province: <span className="text-white">{user.province}</span>{" "}
            </p>
            <p className="text-lg text-gray-500 font-semibold capitalize">
              address: <span className="text-white">{user.address}</span>{" "}
            </p>

            <p>{user.role}</p>
            {Array.isArray(user.categories) ? (
              user.categories.map((category) => (
                <div key={category.id} className="flex">
                  <p>{category.name}</p>
                </div>
              ))
            ) : (
              <p>{user.categories}</p>
            )}

            <p className="text-lg text-gray-500 font-semibold capitalize">
              Rating: <span className="text-white">{user.rating}</span>
            </p>
            <p className="text-lg text-gray-500 font-semibold capitalize">
              id plan: <span className="text-white">{user.planId}</span>
            </p>
            <p className="text-lg text-gray-500 font-semibold capitalize">
              id subscription:{" "}
              <span className="text-white">{user.subscriptionId}</span>
            </p>
            <div className="w-full flex justify-evenly ">
              <button className="w-1/4 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-red-500 hover:bg-red-900  hover:text-red-500 m-3 capitalize">
                ban
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="w-1/4 h-[40px] xl:text-xl text-white border p-1 block rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-600 hover:bg-yellow-900  hover:text-yellow-500 m-3 capitalize"
              >
                delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Users;

"use client";
import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "../../context/Context";
import { getSubscriptions } from "../../../helpers/adminUsers";
import Swal from "sweetalert2";
import { MenuAdmin } from "../../../components/MenuAdmin/MenuAdmin";
import Loader from "../../../components/Loader/Loader";

const Subscriptions = () => {
  const { userData } = useAuth();
  const [LoaderState, setLoaderState] = useState(true);
  const [subscriptions, setSubscriptions] = useState(null);

  useEffect(() => {
    const fetchGetUsers = async () => {
      try {
        setLoaderState(true);
        const data = await getSubscriptions();
        setSubscriptions(data);
        console.log(">>>>>>>>>>>>>>>>>>>>", data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setLoaderState(false);
      }
    };
    fetchGetUsers();
  }, []);

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

  return (
    <>
      {LoaderState ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 flex flex-col items-center">
          <MenuAdmin />
          <div className="relative w-full overflow-x-auto  mt-20">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    fecha de inicio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    fecha de finalizacion
                  </th>
                  <th scope="col" className="px-6 py-3">
                    plan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    usuario
                  </th>
                  <th scope="col" className="px-6 py-3">
                    estado
                  </th>
                </tr>
              </thead>
              {subscriptions?.length > 0
                ? subscriptions.map((element) => (
                    <tbody key={element.id}>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {element.createdAt}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {element.current_period_start}
                        </td>
                        {element.plan.map((plan, index) => (
                          <td
                            key={index}
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {plan.interval}
                          </td>
                        ))}
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {element.user.name}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {element.status}
                        </td>
                      </tr>
                    </tbody>
                  ))
                : null}
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Subscriptions;

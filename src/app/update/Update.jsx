"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { postRegister } from "../../helpers/postRegister";
import { getCategory } from "../../helpers/getCategory";
import arrayProvincias from "./provincias";
import Loader from "../../components/Loader/Loader";
import { validationsUpdate } from "../../helpers/validationsForm";
import Swal from "sweetalert2";

const Update = () => {
  const [categories, setCategories] = useState([]);

  const [LoaderState, setLoaderState] = useState(true);

  const { data: session } = useSession();

  const [user, setUser] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    country: "Argentina",
    province: "",
    city: "",
    address: "",
    role: "",
    categories: [],
  });
  // const { dataUser } = useAuth();
  useEffect(() => {
    // if (dataUser) {
    //   window.location.href = "/";
    // }
    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        setCategories(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      } finally {
        setLoaderState(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      let newCategories;

      if (checked) {
        // Agregar la categoría seleccionada
        newCategories = [...user.categories, value];
      } else {
        // Eliminar la categoría deseleccionada
        newCategories = user.categories.filter(
          (categoryId) => categoryId !== value
        );
      }

      setUser({
        ...user,
        categories: newCategories,
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
    console.log(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await postRegister(user);
      Swal.fire({
        title: "success!",
        text: "data updated successfully",
        icon: "success",
        confirmButtonText: "Cool",
      });

      window.location.href = "/";
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while submitting the request",
        icon: "error",
        confirmButtonText: "Cool",
      });
      console.error("Error al enviar la solicitud POST:", error);
    }
  };

  // MANEJO DE ERRORES
  // MANEJO DE ERRORES
  const [errorForm, setErrorForm] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
    country: "Argentina",
    province: "",
    categories: [],
    role: "",
  });

  useEffect(() => {
    const errors = validationsUpdate(user);
    setErrorForm(errors);
  }, [user]);

  return (
    <>
      {LoaderState ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen flex flex-col  justify-center  bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300">
          <div className="w-full flex flex-col justify-center">
            <div className="w-full lg:min-h-[300px]  flex  justify-center items-center  bg-yellow-500    ">
              <img
                src="https://res.cloudinary.com/dtwiog6cy/image/upload/v1715277145/Proyecto%20FInal/ltpvsdwg7xfds7fzm1ho.png"
                alt=""
                className=" ShadowEffect lg:w-1/4 "
              />
            </div>{" "}
            <div className="w-full min-h-[650px] flex flex-col justify-start items-center bg-gray-800   ">
              <h2 className="text-3xl text-yellow-500 font-bold m-5 capitalize">
                update your data
              </h2>
              <form
                onSubmit={handleSubmit}
                className="md:min-w-[600px]  max-w-[400px] min-h-[450px] flex flex-col justify-evenly items-center  rounded-3xl p-4   "
              >
                {/* INPUT 1 */}
                {/* INPUT 1 */}
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="text-white w-full font-semibold border-b-2 border-yellow-500 bg-transparent m-2"
                />
                {errorForm && errorForm.name && (
                  <p className="text-yellow-700  text-md text-center ">
                    {errorForm.name}
                  </p>
                )}
                {/* INPUT 2 */}
                {/* INPUT 2 */}
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="text-white w-full font-semibold border-b-2 border-yellow-500 bg-transparent m-2"
                />
                {errorForm && errorForm.email && (
                  <p className="text-yellow-700  text-md text-center ">
                    {errorForm.email}
                  </p>
                )}
                {/* INPUT 3 */}
                {/* INPUT 3 */}
                <input
                  type="number"
                  placeholder="Enter phone number"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="text-white font-semibold w-full border-b-2 border-yellow-500 bg-transparent m-2"
                />
                {errorForm && errorForm.phone && (
                  <p className="text-yellow-700  text-md text-center ">
                    {errorForm.phone}
                  </p>
                )}
                {/* INPUT 4 */}
                {/* INPUT 4 */}
                <input
                  type="text"
                  name="country"
                  value={user.country}
                  onChange={handleChange}
                  readOnly
                  className="text-white font-semibold w-full border-b-2 border-yellow-500 bg-transparent m-2"
                />
                {errorForm && errorForm.country && (
                  <p className="text-yellow-700  text-md text-center ">
                    {errorForm.country}
                  </p>
                )}
                {/* SELECT province */}
                {/* SELECT province */}
                <select
                  name="province"
                  value={user.province}
                  onChange={handleChange}
                  className="w-full bg-gray-800  border-b-2 border-yellow-500  text-white font-semibold m-2"
                >
                  <option value="">Choose province:</option>
                  {arrayProvincias.map((province, index) => (
                    <option key={index} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
                {errorForm && errorForm.province && (
                  <p className="text-yellow-700  text-md text-center ">
                    {errorForm.province}
                  </p>
                )}
                {/* INPUT 5 */}
                {/* INPUT 5 */}
                <input
                  type="text"
                  name="city"
                  value={user.city}
                  placeholder="city..."
                  onChange={handleChange}
                  className="text-white font-semibold w-full border-b-2 border-yellow-500 bg-transparent m-2"
                />
                {errorForm && errorForm.address && (
                  <p className="text-yellow-700  text-md text-center ">
                    {errorForm.address}
                  </p>
                )}
                {/* INPUT 6 */}
                {/* INPUT 6 */}
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  placeholder="Address..."
                  onChange={handleChange}
                  className="text-white font-semibold w-full border-b-2 border-yellow-500 bg-transparent m-2"
                />
                {errorForm && errorForm.address && (
                  <p className="text-yellow-700  text-md text-center ">
                    {errorForm.address}
                  </p>
                )}
                {/* SELECT role */}
                {/* SELECT role */}
                <select
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  className="w-full bg-gray-800  border-b-2 border-yellow-500 text-white font-semibold capitalize m-2"
                >
                  <option value="">Select User Type:</option>
                  <option value="CLIENT">CLIENT</option>
                  <option value="PROFESSIONAL">PROFESSIONAL</option>
                </select>
                {errorForm && errorForm.role && (
                  <p className="text-yellow-700  text-md text-center ">
                    {errorForm.role}
                  </p>
                )}
                {/* SELECT categories */}
                {/* SELECT categories */}
                {user.role === "PROFESSIONAL" && (
                  <div className="bg-gray-800 rounded-xl flex flex-col items-center m-2">
                    <label
                      htmlFor="categories"
                      className="m-2 text-yellow-500 font-semibold capitalize"
                    >
                      Select your categories
                    </label>
                    <div className="w-full flex justify-evenly items-center flex-wrap m-2">
                      {categories.map((job) => (
                        <div
                          key={job.id}
                          className="border-b-2 border-yellow-500 m-2 flex items-center"
                        >
                          <label
                            htmlFor={`categories_${job.id}`}
                            className="capitalize pr-1"
                          >
                            {job.name}
                          </label>
                          <input
                            type="checkbox"
                            name="categories"
                            value={job.id}
                            onChange={handleChange}
                          />
                          {errorForm && errorForm.categories && (
                            <p className="text-yellow-700  text-md text-center ">
                              {errorForm.categories}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button className="w-[200px] h-[40px] xl:text-xl text-gray-700 border p-1 block rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700 hover:text-yellow-500 m-3">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Update;

"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { postRegister } from "../../helpers/postRegister";
import { getCategory } from "../../helpers/getCategory";
import arrayProvincias from "./provincias";

const Update = () => {
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);

  const [user, setUser] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
    country: "Argentina",
    province: "",
    skills: [],
    role: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        setCategories(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    let newValue;

    if (type === "checkbox") {
      if (checked) {
        // Si el checkbox está marcado, agregamos la habilidad al array de habilidades
        newValue = [...user.skills, value];
      } else {
        // Si el checkbox está desmarcado, eliminamos la habilidad del array de habilidades
        newValue = user.skills.filter((skill) => skill !== value);
      }
    } else {
      // Para otros campos, simplemente asignamos el valor directamente
      newValue = value;
    }

    setUser({
      ...user,
      [name]: newValue,
    });

    console.log(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await postRegister(user);
      alert("Registro exitoso");
      window.location.href = "/";
    } catch (error) {
      console.error("Error al enviar la solicitud POST:", error);
      alert("Ocurrió un error al enviar la solicitud POST");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col  justify-center items-center bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300">
      <div className="w-full flex justify-center">
        <div className="w-1/3 min-h-[450px] flex  justify-start items-center  bg-yellow-500 rounded-l-2xl border-4 border-gray-900  ">
          <img
            src="https://res.cloudinary.com/dtwiog6cy/image/upload/v1715277145/Proyecto%20FInal/ltpvsdwg7xfds7fzm1ho.png"
            alt=""
            className=" ShadowEffect "
          />
        </div>{" "}
        <div className="w-1/2 min-h-[450px] flex flex-col justify-start items-center  bg-gray-900  rounded-r-2xl ">
          <h2 className="text-3xl text-yellow-500 font-bold m-5 capitalize">
            update your data
          </h2>
          <form
            onSubmit={handleSubmit}
            className="min-w-[600px]  max-w-[400px] min-h-[450px] flex flex-col justify-evenly items-center  rounded-3xl p-4   "
          >
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="text-white w-full font-semibold border-b-2 border-yellow-500 bg-transparent m-2"
            />

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="text-white w-full font-semibold border-b-2 border-yellow-500 bg-transparent m-2"
            />

            <input
              type="text"
              placeholder="Enter phone number"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="text-white font-semibold w-full border-b-2 border-yellow-500 bg-transparent m-2"
            />

            <input
              type="text"
              name="country"
              value={user.country}
              onChange={handleChange}
              readOnly
              className="text-white font-semibold w-full border-b-2 border-yellow-500 bg-transparent m-2"
            />

            <select
              name="province"
              value={user.province}
              onChange={handleChange}
              className="w-full  bg-gray-900 border-b-2 border-yellow-500  text-white font-semibold m-2"
            >
              <option value="">Choose Province:</option>
              {arrayProvincias.map((provincia, index) => (
                <option key={index} value={provincia}>
                  {provincia}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="address"
              value={user.address}
              placeholder="Address..."
              onChange={handleChange}
              className="text-white font-semibold w-full border-b-2 border-yellow-500 bg-transparent m-2"
            />

            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="w-full  bg-gray-900 border-b-2 border-yellow-500 text-white font-semibold capitalize m-2"
            >
              <option value="">Select User Type:</option>
              <option value="client">Client</option>
              <option value="professional">Professional</option>
            </select>
            {user.role === "professional" && (
              <div className="bg-gray-800 rounded-xl flex flex-col items-center m-2">
                <label
                  htmlFor="skills"
                  className="m-2 text-yellow-500 font-semibold capitalize"
                >
                  Select your skills
                </label>
                <div className="w-full flex justify-evenly items-center flex-wrap m-2">
                  {categories.map((job) => (
                    <div
                      key={job.id}
                      className="border-b-2 border-yellow-500 m-2 flex items-center"
                    >
                      <label
                        htmlFor={`skill_${job.id}`}
                        className="capitalize pr-1"
                      >
                        {job.name}
                      </label>
                      <input
                        type="checkbox"
                        name="skills"
                        value={job.name}
                        onChange={handleChange}
                      />
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
  );
};

export default Update;

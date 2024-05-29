"use client";
import React, { useState, useEffect } from "react";
import { validationsNewPost } from "../../helpers/validationsForm";
import { postNewPublic } from "../../helpers/postNewPost";
import { getCategory } from "../../helpers/getCategory";
import Swal from "sweetalert2";
import { useAuth } from "../context/Context";
import { redirect } from "next/navigation";
import arrayProvincias from "../update/provincias";

const CreateJob = () => {
  const { userData } = useAuth();
  const [userId, setUserId] = useState("");

  // Actualizar el userId cada vez que userData cambie
  useEffect(() => {
    if (userData === "ban") {
      Swal.fire({
        title: "Usuario Banneado!",
        text: "Tu cuenta ha sido suspendida temporalmente debido a actividades que infringen nuestras políticas. Por favor, contáctanos para obtener más información y resolver esta situación lo antes posible.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      redirect("/");
    }

    if (userData) {
      setUserId(userData.id);
    }
  }, [userData]);

  const [postState, setPostState] = useState({
    name: "",
    description: "",
    base_price: "",
    categoryId: "",
    userId: "",
    country: "argentina",
    province: "",
    city: "",
    address: "",
    file: null,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userData) {
        Swal.fire({
          title: "Espera!",
          text: "Para crear una publicacion debes completar tus datos",
          icon: "info",
          confirmButtonText: "Completar",
        });
        redirect("/update");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [userData]);

  useEffect(() => {
    // Actualizar userId en postState cuando cambie
    setPostState((prevState) => ({
      ...prevState,
      userId: userId,
    }));
  }, [userId]);

  const [errorForm, setErrorForm] = useState({
    name: "",
    description: "",
    base_price: "",
  });

  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    const errors = validationsNewPost(postState);
    setErrorForm(errors);
  }, [postState]);

  const handleOnChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "file") {
      setPostState({
        ...postState,
        file: files[0],
      });
    } else {
      setPostState({
        ...postState,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Asegúrate de que todos los campos requeridos están presentes y no están vacíos
    if (
      !postState.country ||
      !postState.province ||
      !postState.city ||
      !postState.address
    ) {
      Swal.fire({
        title: "Error!",
        text: "Por favor completa todos los campos requeridos",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", postState.name);
    formData.append("description", postState.description);
    formData.append("base_price", postState.base_price);
    formData.append("categoryId", postState.categoryId);
    formData.append("userId", postState.userId);
    formData.append("country", postState.country);
    formData.append("province", postState.province);
    formData.append("city", postState.city);
    formData.append("address", postState.address);
    formData.append("file", postState.file);

    try {
      const datapost = await postNewPublic(formData);

      Swal.fire({
        title: "Success!",
        text: "Successful publication",
        icon: "success",
        confirmButtonText: "Cool",
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Error al enviar la solicitud POST:", error);
      // NEW ALERT
      Swal.fire({
        title: "Error!",
        text: "An error occurred while submitting the request",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300">
      <div className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center md:m-10">
        <div className="w-full sm:w-1/2 md:w-1/3 md:h-[500px] lg:h-[600px] overflow-hidden sm:flex items-center justify-center shadow-2xl  md:rounded-l-xl">
          <img
            src="https://res.cloudinary.com/dtwiog6cy/image/upload/v1715265952/Proyecto%20FInal/p8glimcbog6egt4nihcg.jpg"
            alt=""
            className="hidden sm:w-full sm:h-full sm:mt-10 sm:rounded-t-xl md:m-0 sm:block md:rounded-l-xl md:rounded-t-none"
          />
          <img
            src="https://res.cloudinary.com/dtwiog6cy/image/upload/v1715265952/Proyecto%20FInal/y7vhpbqtveqmyhoamjfi.jpg"
            alt=""
            className="w-full h-full sm:hidden"
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 h-[600px] flex justify-center items-center border-b-4 border-yellow-500 sm:border-0">
          <form
            onSubmit={handleSubmit}
            className="w-full h-full md:h-[500px] lg:h-[600px] bg-gray-900 flex flex-col items-center justify-evenly shadow-2xl md:shadow-black sm:mb-10 sm:rounded-b-xl md:rounded-none md:m-0 md:rounded-r-xl"
          >
            <h2 className="text-yellow-500 text-xl xl:text-3xl font-semibold mt-5">
              Create a new Post
            </h2>
            <input
              type="text"
              name="name"
              value={postState.name}
              onChange={handleOnChange}
              className="w-3/4 h-10 bg-transparent border-b-2 border-yellow-500 font-semibold mt-3"
              placeholder="Title..."
            />
            {errorForm.name && (
              <p className="text-yellow-700 text-md text-center">
                {errorForm.name}
              </p>
            )}
            <textarea
              type="text"
              name="description"
              value={postState.description}
              onChange={handleOnChange}
              className="w-3/4 h-20 bg-transparent border-b-2 border-yellow-500 font-semibold mt-3"
              placeholder="Description..."
            />
            {errorForm.description && (
              <p className="text-yellow-700 text-md text-center">
                {errorForm.description}
              </p>
            )}
            <input
              type="text"
              name="base_price"
              value={postState.base_price}
              onChange={handleOnChange}
              className="w-3/4 h-10 bg-transparent border-b-2 border-yellow-500 mt-3 font-semibold"
              placeholder="Base price..."
            />
            {errorForm.base_price && (
              <p className="text-yellow-700 text-md text-center">
                {errorForm.base_price}
              </p>
            )}
            <select
              name="categoryId"
              value={postState.categoryId}
              onChange={handleOnChange}
              className="w-3/4 p-2 bg-gray-900 placeholder:text-sm text-sm border-b-2 border-yellow-500 font-semibold"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="file"
              name="file"
              onChange={handleOnChange}
              className="w-3/4 p-2 placeholder:text-sm text-sm"
            />

            {/* SELECT province */}
            <select
              name="province"
              value={postState.province}
              onChange={handleOnChange}
              className="w-3/4 p-2 bg-gray-900 placeholder:text-sm text-sm border-b-2 border-yellow-500 font-semibold"
            >
              <option value="">Choose province:</option>
              {arrayProvincias.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {/* INPUT city */}
            <input
              type="text"
              name="city"
              value={postState.city}
              onChange={handleOnChange}
              className="w-3/4 h-10 bg-transparent border-b-2 border-yellow-500 mt-3 font-semibold"
              placeholder="City..."
            />
            {/* INPUT address */}
            <input
              type="text"
              name="address"
              value={postState.address}
              onChange={handleOnChange}
              className="w-3/4 h-10 bg-transparent border-b-2 border-yellow-500 mt-3 font-semibold"
              placeholder="Address..."
            />
            <button
              disabled={Object.keys(errorForm).length > 0}
              type="submit"
              className="w-[80px] h-[40px] xl:text-xl text-gray-700 border p-1 block rounded-lg border-yellow-500 font-semibold duration-1000 bg-yellow-500 hover:bg-gray-700 hover:text-yellow-500 mt-3 mb-3 disabled:bg-gray-500 hover:disabled:text-gray-700"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;

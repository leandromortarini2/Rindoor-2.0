"use client";
import React, { useEffect, useState } from "react";
import { MenuAdmin } from "../../../components/MenuAdmin/MenuAdmin";
import { getCategory } from "../../../helpers/adminUsers";
import { deleteCategory } from "../../../helpers/adminUsers";
import { editCategories } from "../../../helpers/adminUsers";
import { createCategoryAPI } from "../../../helpers/adminUsers";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";
import { useAuth } from "../../context/Context";
import { redirect } from "next/navigation";

const Categories = () => {
  const { userData } = useAuth();

  const [LoaderState, setLoaderState] = useState(true);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    file: "",
  });
  const [categoryEdit, setCategoryEdit] = useState({
    id: "",
    name: "",
    description: "",
    file: "",
  });
  const [error, setError] = useState(null);
  const [buttonAdd, setButtonAdd] = useState(false);
  const [buttonEdit, setButtonEdit] = useState(false);

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
    setLoaderState(true);

    const fetchGetPosts = async () => {
      try {
        const newCategory = await getCategory();
        setCategories(newCategory);
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        setError("Error al obtener publicaciones.");
      } finally {
        setLoaderState(false);
      }
    };
    fetchGetPosts();
  }, []);

  //! BORRAR  CATEGORIA
  //! BORRAR  CATEGORIA
  //! BORRAR  CATEGORIA
  //! BORRAR  CATEGORIA
  //! BORRAR  CATEGORIA
  //! BORRAR  CATEGORIA
  //! BORRAR  CATEGORIA
  //! BORRAR  CATEGORIA
  //! BORRAR  CATEGORIA
  //! BORRAR  CATEGORIA
  const handleDelete = async (id) => {
    try {
      const categoryId = await deleteCategory(id);
      if (!categoryId) {
        Swal.fire({
          title: "Eliminado!",
          text: "Categoría eliminada con éxito",
          icon: "success",
          confirmButtonText: "Cool",
        });
        setCategories(categories.filter((category) => category.id !== id));
      } else {
        Swal.fire({
          title: "Error!",
          text: "No se pudo eliminar la categoría",
          icon: "error",
          confirmButtonText: "Cool",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "No se pudo eliminar la publicación",
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

  //! CREAR CATEGORIA
  //! CREAR CATEGORIA
  //! CREAR CATEGORIA
  //! CREAR CATEGORIA
  //! CREAR CATEGORIA
  //! CREAR CATEGORIA
  //! CREAR CATEGORIA
  //! CREAR CATEGORIA
  //! CREAR CATEGORIA

  const handleButtonAdd = () => {
    setButtonAdd(!buttonAdd);
  };

  const handleOnChangeCreate = (event) => {
    const { name, value, files } = event.target;

    if (name === "file") {
      setCategory({
        ...category,
        file: files[0],
      });
    } else {
      setCategory({
        ...category,
        [name]: value,
      });
    }
  };

  const handleSubmitCreate = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    formData.append("file", category.file); // Aquí adjunta la imagen
    try {
      // Aquí deberías llamar a la función que crea la categoría, por ejemplo:
      const datapost = await createCategoryAPI(formData);

      Swal.fire({
        title: "Success!",
        text: "Successful publication",
        icon: "success",
        confirmButtonText: "Cool",
      });
      window.location.href = "/admin/categories";
    } catch (error) {
      console.error("Error al enviar la solicitud POST:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while submitting the request",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  // EDITAR CATEGORIA
  // EDITAR CATEGORIA
  // EDITAR CATEGORIA
  // EDITAR CATEGORIA
  // EDITAR CATEGORIA
  // EDITAR CATEGORIA
  // EDITAR CATEGORIA
  // EDITAR CATEGORIA
  // EDITAR CATEGORIA
  // EDITAR CATEGORIA
  const handleButtonEdit = (category) => {
    setCategoryEdit(category);
    setButtonEdit(!buttonEdit);
  };

  const handleOnChangeEdit = (event) => {
    const { name, value, files } = event.target;

    if (name === "file") {
      setCategoryEdit({
        ...categoryEdit,
        file: files[0],
      });
      console.log(categoryEdit);
    } else {
      setCategoryEdit((prevCategoryEdit) => ({
        ...prevCategoryEdit,
        [name]: value,
      }));
    }
    console.log(categoryEdit);
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    // Verificar la longitud de la descripción y truncarla si es necesario
    let editedDescription = categoryEdit.description;
    if (editedDescription.length > 50) {
      editedDescription = editedDescription.substring(0, 50);
    }

    try {
      const formData = new FormData();
      formData.append("name", categoryEdit.name);
      formData.append("description", editedDescription);
      formData.append("file", categoryEdit.file);

      await editCategories(categoryEdit.id, formData);

      Swal.fire({
        title: "Success!",
        text: "Successful update",
        icon: "success",
        confirmButtonText: "Cool",
      });

      setCategories(
        categories.map((cat) =>
          cat.id === categoryEdit.id ? { ...cat, ...categoryEdit } : cat
        )
      );
      setButtonEdit(false);
      console.log(categoryEdit);
    } catch (error) {
      console.error("Error al enviar la solicitud POST:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while submitting the request",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };
  return (
    <>
      {LoaderState ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 flex flex-col items-center ">
          <MenuAdmin />
          <div className="w-1/2 h-14 lg:h-20 bg-gray-500 flex justify-center items-center m-5 rounded-3xl">
            <h2 className="text-xl lg:text-3xl text-gray-900 font-bold text-center capitalize">
              Categorias
            </h2>
          </div>
          {buttonAdd ? (
            <button
              onClick={handleButtonAdd}
              className="w-1/2 md:w-1/4 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-orange-600 hover:bg-red-900  hover:text-red-500 m-3 capitalize"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={handleButtonAdd}
              className="w-1/2 md:w-1/4 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-green-600 hover:bg-green-900  hover:text-green-500 m-3 capitalize"
            >
              Add Category
            </button>
          )}
          {buttonAdd && (
            <div className="w-full h-[400px] bg-gray-900 rounded-2xl flex justify-center items-center">
              <form
                className="w-3/4 h-[350px] flex flex-col justify-evenly items-center "
                onSubmit={handleSubmitCreate}
              >
                <div>
                  <label htmlFor="name" className="text-gray-500">
                    Name category:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={category.name}
                    onChange={handleOnChangeCreate}
                    className="ml-2 border-b-2 border-gray-500 bg-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="text-gray-500">
                    Description:
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={category.description}
                    onChange={handleOnChangeCreate}
                    className="ml-2 border-b-2 border-gray-500 bg-transparent"
                  />
                </div>
                <input
                  type="file"
                  name="file"
                  onChange={handleOnChangeCreate}
                  className="w-3/4 lg:w-1/3"
                />
                <button className="w-3/4 md:w-1/4 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-green-600 hover:bg-green-900  hover:text-green-500 m-3 capitalize">
                  Add Category
                </button>
              </form>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-center">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="w-3/4 min-h-[400px] m-5 flex flex-col justify-evenly items-center bg-gray-900 border border-gray-900 rounded-2xl p-2 "
                >
                  <p className="text-xl text-white font-semibold capitalize m-2 text-center ">
                    {category.name}
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 lg:font-semibold capitalize text-center p-1">
                    id: <span className="text-white">{category.id}</span>
                  </p>
                  <p className="text-sm lg:text-md text-gray-500 lg:font-semibold capitalize text-center p-1">
                    description:{" "}
                    <span className="text-white">{category.description}</span>
                  </p>

                  <div className="w-full flex justify-evenly ">
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="w-1/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-red-500 hover:bg-red-900  hover:text-red-500 m-3 capitalize"
                    >
                      Delete
                    </button>
                    {buttonEdit && categoryEdit.id === category.id ? (
                      <button
                        onClick={() => setButtonEdit(false)}
                        className="w-1/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-orange-600 hover:bg-red-900  hover:text-red-500 m-3 capitalize"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => handleButtonEdit(category)}
                        className="w-1/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-yellow-600 hover:bg-yellow-900  hover:text-yellow-500 m-3 capitalize"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  {buttonEdit && categoryEdit.id === category.id && (
                    <form
                      onSubmit={handleSubmitEdit}
                      className="w-full min-h-[400px] flex flex-col justify-evenly items-center bg-gray-800 rounded-xl text-sm   "
                    >
                      <div className="w-full flex flex-col">
                        <label
                          htmlFor="name"
                          className="text-gray-500 text-sm md:text-md lg:text-lg pl-1"
                        >
                          Name category:
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={categoryEdit.name}
                          onChange={handleOnChangeEdit}
                          className="ml-2 border-b-2 border-gray-500 bg-transparent m-1"
                        />
                      </div>
                      <div className="w-full flex flex-col">
                        <label
                          htmlFor="description"
                          className="text-gray-500 text-sm md:text-md lg:text-lg pl-1"
                        >
                          Description:
                        </label>
                        <textarea
                          type="text"
                          name="description"
                          value={categoryEdit.description}
                          onChange={handleOnChangeEdit}
                          className="ml-2 border-b-2 border-gray-500 bg-transparent"
                        />
                      </div>
                      <input
                        type="file"
                        name="file"
                        onChange={handleOnChangeEdit}
                        className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 p-2 "
                      />
                      <button className="w-3/4  md:w-1/4 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-green-600 hover:bg-green-900  hover:text-green-500 m-3 capitalize">
                        Send Edit
                      </button>
                    </form>
                  )}
                </div>
              ))
            ) : (
              <p className="text-2xl text-white font-semibold capitalize">
                No hay publicaciones disponibles
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;

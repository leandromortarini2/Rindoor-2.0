"use client";
import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import "./Selector.module.css";

export const Selector = ({ filterWorksCategory }) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const categories = [
    { name: "albañileria" },
    { name: "Electricidad" },
    { name: "plomeria" },
    { name: "techo" },
    { name: "colocacion" },
  ];

  return (
    <div className="font-medium h-30 w-64 relative">
      <div
        onClick={() => setOpen(!open)}
        className={`text-yellow-500 w-full p-2 flex items-center justify-between  bg-gray-900  ${
          open ? "rounded-none" : "rounded-b"
        } ${!selected && "text-gray-700"}`}
      >
        {selected ? selected : "Seleccione oficio"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        id="ulExpress"
        className={`bg-gray-900 overflow-y-auto absolute w-full ${
          open ? "max-h-50 " : "max-h-0"
        }`}
      >
        <div className="flex items-center px-2 sticky top-0 bg-gray-900 ">
          <AiOutlineSearch size={18} className=" text-yellow-300 " />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLocaleLowerCase())}
            placeholder="Inserte oficio"
            className="text-yellow-300 placeholder:text-yellow-300  p-1 outline-none bg-gray-900 "
          />
        </div>
        {categories.map((category) => (
          <li
            key={category.name}
            className={`text-yellow-500 p-2 text-sm hover:bg-yellow-300 hover:text-black hover:cursor-pointer ${
              category.name.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (category.name.toLowerCase() !== selected.toLowerCase()) {
                setSelected(category.name);
                filterWorksCategory(category.name);
                setOpen(false);
              }
            }}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { BiChevronDown } from "react-icons/bi";
import "./Selector.module.css";

export const SortBy = forwardRef(({ sortWorks }, ref) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const Resetear = () => {
    setSelected("");
    setInputValue("");
    setOpen(false);
  };
  useImperativeHandle(ref, () => ({
    Resetear,
  }));

  const sort = [
    { name: "Precio: menor a mayor", key: "prices", value: 0 },
    { name: "Precio: mayor a menor", key: "prices", value: 1 },
    { name: "Titulo: A-Z", key: "name", value: 0 },
    { name: "Titulo: Z-A", key: "name", value: 1 },
  ];

  return (
    <div className="font-medium h-30 md:w-40 relative w-full md:px-0 px-5">
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className={`text-yellow-500 w-full p-2 flex items-center justify-between  ${
          open ? "rounded-none" : "rounded-b"
        } ${!selected && "text-gray-700"}
        hover:cursor-pointer
        `}
      >
        {selected ? selected : "Ordenar por:"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        id="ulExpress"
        className={`bg-gray-800 overflow-y-auto absolute w-full ${
          open ? "max-h-50 " : "max-h-0"
        }`}
      >
        {sort.map((sorteo) => (
          <li
            key={sorteo.name}
            className={`text-yellow-500 p-2 text-sm hover:bg-yellow-300 hover:text-black hover:cursor-pointer ${
              sorteo.name.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (sorteo.name.toLowerCase() !== selected.toLowerCase()) {
                setSelected(sorteo.name);
                sortWorks(sorteo);
                setOpen(false);
              }
            }}
          >
            {sorteo.name}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SortBy;

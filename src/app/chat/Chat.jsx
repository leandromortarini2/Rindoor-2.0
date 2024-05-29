"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { io } from "socket.io-client";
import { chats } from "./data";
import { useAuth } from "../context/Context";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";

const img =
  "https://kottke.org/cdn-cgi/image/format=auto,fit=scale-down,width=1200,metadata=none/plus/misc/images/ai-faces-01.jpg";
const socket = io("https://rindoor-backend.onrender.com", {
  autoConnect: false,
});

const ShowChat = ({ messages, userTo }) => {
  const converToTime = (dateToConver) => {
    const date = new Date(dateToConver);
    const optionsDate = { day: "2-digit", month: "2-digit", year: "numeric" };
    const optionsTime = { hour: "2-digit", minute: "2-digit" };
    const formattedDate = date.toLocaleDateString("es-ES", optionsDate);
    const formattedTime = date.toLocaleTimeString("es-ES", optionsTime);

    return `${formattedDate} ${formattedTime}`;
  };

  const containerRef = useRef(null);
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="w-full px-3 h-full flex flex-col ">
      <div className="HEADER  w-full flex items-center justify-around">
        {/* <img
          className="m-3 rounded-full max-w-16 max-h-16 min-w-16 min-h-16"
          src={img}
          alt="asdasd"
        /> */}
        <h2 className="text-3xl my-5 ">{userTo?.name}</h2>
      </div>
      <div className="">
        <div ref={containerRef} className=" w-full h-[25rem] overflow-auto ">
          {messages.map((message, index) => (
            <div key={index}>
              {message.from.id !== `${userTo.id}` ? (
                <div className="w-full flex justify-end my-5 pr-1 ">
                  <div className="px-4 rounded-full bg-gray-700  ">
                    {message.message}
                    <p className="text-gray-300 text-[10px]">
                      {converToTime(message.createdAt)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-start  my-5 ">
                  <div className="px-4 rounded-full bg-gray-600  ">
                    {message.message}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export const Chat = () => {
  //ACA ANDA EL CHAT ACA ANDA EL CHAT ACA ANDA EL CHAT ACA ANDA EL CHAT ACA ANDA EL CHAT

  const { userData } = useAuth();

  const userFromInitialState = {
    id: "68612bf1-fdd8-46f5-b184-7a8f64c4b584",
    isActive: true,
    banned: false,
    name: "Pablo Antonio Alvarado Ruiz",
    email: "paalvarador@gmail.com",
    phone: "0964041045",
    country: "Argentina",
    province: "Buenos Aires",
    city: "Buenos Aires",
  };
  const [mensaje, setMensaje] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chat, setChat] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [userTo, setUserTo] = useState(null);
  const [userFrom, setUserFrom] = useState("");
  useEffect(() => {
    if (userData) {
      setUserFrom(userData);
    }
  }, [userData]);
  useEffect(() => {
    if (userTo) {
      socket.emit("joinRoom", {
        userFrom: userFrom.id,
        userTo: userTo.id,
      });

      let messageEvent;
      if (userTo.id > userFrom.id)
        messageEvent = `chat_${userFrom.id}_${userTo.id}`;
      else messageEvent = `chat_${userTo.id}_${userFrom.id}`;

      socket.on(messageEvent, (e) => {
        console.log("********LLEGO MENSAJE********");
        setMessages((messages) => [...messages, e]);
      });

      socket.on("roomMessages", (e) => {
        console.log("*******MENSAJES DE LA SALA*********", e);
        setMessages(e);
      });
      // Aquí es donde te desuscribes de los eventos
      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off(messageEvent);
      };
    }
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
  }, [contacts, userFrom, userTo]);
  useEffect(() => {
    console.log(userData);
    if (userData === undefined) return;
    if (!userData) {
      Swal.fire({
        title: "Espera!",
        text: "Para crear una publicacion debes completar tus datos",
        icon: "info",
        confirmButtonText: "Completar",
      });
      redirect("/update");
    }
  }, [userData]);
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("start", {
        userFrom: userFrom.id,
      });
      setIsConnected(true);
    });

    socket.on(`contacts_${userFrom.id}`, (e) => {
      console.log(e);
      setContacts(e);
      setUserTo(e[0]);
    });

    socket.connect();
  }, []);
  const sendMessage = (message) => {
    console.log(
      "entro al enviar mensaje",
      message,
      " // ",
      userFrom.name,
      " // ",
      userTo.name
    );
    socket.emit("chat", {
      message,
      userFrom: userFrom.id,
      userTo: userTo.id,
    });
  };

  const enviar = (mensaje) => {
    if (mensaje) {
      sendMessage(mensaje);
      setMensaje("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      enviar(mensaje);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 flex flex-col justify-evenly items-center">
      <div className="bg-gray-800  w-3/4 flex h-[35rem] flex flex-row  border border-gray-400 ">
        <div className="w-2/6 border-r border-gray-400  h-[35rem] b ">
          <div className="text-yellow-300 text-3xl border-b-2 border-gray-600 w-full h-20 flex items-center justify-center">
            Chats
          </div>
          <div className="my-2">
            {contacts.map((contact, index) => (
              <a
                className="w-full h-16 rounded-full hover:bg-gray-600 hover:cursor-pointer flex "
                key={index}
                onClick={() => setUserTo(contact)}
              >
                <div className="w-1/4 h-16 flex items-center">
                  <img
                    className="m-3 rounded-full max-w-12 max-h-12 min-w-12 min-h-12"
                    src={img}
                    alt="foto_de_perfil"
                  />
                </div>
                <div className="w-full flex flex-col">
                  <div className="font-bold w-full">{contact.name}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className=" h-[35rem] flex w-4/6 items-center flex-col ">
          {messages ? (
            <div className="h-5/6 w-full">
              <ShowChat messages={messages} userTo={userTo} key={2} />
            </div>
          ) : (
            <div className=" flex w-4/6 items-center justify-center ">
              Selecciona un chat para abrir
            </div>
          )}

          <div className="h-1/6 w-full flex items-center p-4">
            {messages ? (
              <>
                <input
                  className="w-full p-2 border border-gray-300 rounded text-black "
                  onChange={(e) => setMensaje(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  type="text"
                  value={mensaje}
                  placeholder="Mensaje..."
                />
                <a
                  className="text-black hover:text-white m-4 w-12 h-10 items-center justify-center flex rounded-full bg-gray-300
                hover:bg-gray-900 hover:cursor-pointer"
                  onClick={() => enviar(mensaje)}
                >
                  {">"}
                </a>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

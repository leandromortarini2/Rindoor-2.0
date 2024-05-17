import React, { createContext, useContext, useEffect, useState } from "react";
import { decoToken } from "../../helpers/decoToken";

// Crear el contexto de autenticación
const AuthContext = createContext({
  dataUser: {},
  setdataUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [dataUser, setdataUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (token) {
      try {
        const tokenData = decoToken(token);
        console.log("Datos decodificados del token en useEffect:", tokenData);
        setdataUser(tokenData);
      } catch (error) {
        console.error("Error decodificando el token:", error);
      }
    } else {
      console.log("No se encontró un token en localStorage");
    }
  }, []);

  useEffect(() => {
    console.log("Estado actualizado de dataUser:", dataUser);
  }, [dataUser]);

  return (
    <AuthContext.Provider value={{ dataUser, setdataUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

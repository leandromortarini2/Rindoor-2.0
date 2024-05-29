import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { postEmail } from "../../helpers/postSingin";
import { decoToken } from "../../helpers/decoToken";

/**
 * Proveedor de contexto de autenticación para la aplicación.
 *
 * @component AuthProvider
 * @param {Object} props - Propiedades del componente.
 * @returns {JSX.Element} Proveedor de contexto de autenticación.
 */

// Crear el contexto de autenticación
const AuthContext = createContext({
  userData: null,
  setUserData: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          // Enviar el correo electrónico para obtener el token
          const token = await postEmail(session.user.email);

          localStorage.setItem("token", token);

          // sessionStorage.setItem("token", token);

          // Verificar si token es un string
          if (
            typeof token !== "string" &&
            token.message === "usuario baneado"
          ) {
            setUserData("ban");
            // console.error("es por acaaaaaa");

            return;
          }

          // Decodificar el token para obtener la data del usuario
          const tokenData = decoToken(token);
          // console.log("Data del token decodificado:", tokenData);

          // Verificar si tokenData es un objeto válido
          if (tokenData && typeof tokenData === "object") {
            setUserData(tokenData);
          } else {
            console.error("Token data no es un objeto válido:", tokenData);
          }
        } catch (error) {
          console.error("Error al obtener o decodificar el token:", error);
        }
      } else {
        setUserData(null);
      }
    };

    fetchUserData();
  }, [session]);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

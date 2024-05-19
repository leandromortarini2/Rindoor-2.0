import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { postEmail } from "../../helpers/postSingin";
import { decoToken } from "../../helpers/decoToken";

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

          // Decodificar el token para obtener la data del usuario
          const tokenData = decoToken(token);
          console.log("Data del token decodificado:", tokenData);

          // Verificar que tokenData sea un objeto válido
          if (tokenData && typeof tokenData === "object") {
            setUserData((prevUserData) => {
              console.log("======================", prevUserData);
              return tokenData;
            });
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

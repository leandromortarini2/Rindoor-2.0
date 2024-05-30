"use client";
import { WorkPageCard } from "../../../components/WorkPageCard/WorkPageCard";
import React, { useEffect, useState } from "react";
import { getWorkById } from "../../../helpers/helperWorksPage";
import Loader from "../../../components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/Context";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
export default function page({ params }) {
  const { data: session } = useSession();
  const [cardData, setCardData] = useState({});
  const [LoaderState, setLoaderState] = useState(true);
  const router = useRouter();
  useEffect(() => {
    console.log("rtarta", session);
  }, [session]);
  useEffect(() => {
    if (!session) {
      if (session === null) {
        Swal.fire({
          title: "Espera!",
          text: "Para ver los datos del trabajo, debes iniciar sesion!",
          icon: "info",
          confirmButtonText: "niciar sesion",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/");
          }
        });
      }
    }
  }, [session]);

  useEffect(() => {
    getWorkById(params.worksId)
      .then((responseData) => {
        setCardData(responseData);
        setLoaderState(false);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 flex justify-evenly flex-col items-center">
      {LoaderState ? <Loader /> : <WorkPageCard cardData={cardData} />}
    </div>
  );
}

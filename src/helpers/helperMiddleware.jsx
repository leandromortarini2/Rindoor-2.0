import { useSession } from "next-auth/react";
import React from "react";
import { postEmail } from "./postSingin";

export const helperMiddleware = () => {
  const { data: session } = useSession();
  if (session?.user?.email) {
    try {
      return postEmail(session.user.email);
    } catch (error) {
      return "nothin";
    }
  }
};

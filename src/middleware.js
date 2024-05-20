"use client";
import { signIn, useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { postEmail } from "./helpers/postSingin";
import React from "react";
import { helperMiddleware } from "./helpers/helperMiddleware";
let isLoggedIn = true;
const notAllowed = [
  "http://localhost:3000/profile",
  "http://localhost:3000/createjob",
  "http://localhost:3000/subscription",
];

const middleware = (request) => {
  if (!isLoggedIn && notAllowed.includes(request.url)) {
    return NextResponse.redirect("http://localhost:3000/forbidden");
  } else {
    return NextResponse.next();
  }
};

export default middleware;

"use client";
import { NextResponse } from "next/server";

const notAllowed = [
  "https://rindoor-2-0.vercel.app/profile",
  "https://rindoor-2-0.vercel.app/createjob",
  "https://rindoor-2-0.vercel.app/subscription",
];

const isLoggedIn = true;
const middleware = (request) => {
  if (!isLoggedIn && notAllowed.includes(request.url)) {
    return NextResponse.redirect("https://rindoor-2-0.vercel.app/forbidden");
  } else {
    return NextResponse.next();
  }
};

export default middleware;

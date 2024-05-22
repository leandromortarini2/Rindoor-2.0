"use client";
import { NextResponse } from "next/server";

const notAllowed = [
  "https://rindoor-2-0.vercel.app/profile",
  "https://rindoor-2-0.vercel.app/createjob",
  "https://rindoor-2-0.vercel.app/subscription",
];
const notAllowedTest = [
  "http://localhost:3000/profile",
  "http://localhost:3000/createjob",
  "http://localhost:3000/subscription",
];
const forbidden = "https://rindoor-2-0.vercel.app/forbidden";
const forbiddenTest = "http://localhost:3000/forbidden";

const isLoggedIn = true;
const middleware = (request) => {
  if (!isLoggedIn) {
    if (notAllowedTest.includes(request.url)) {
      return NextResponse.redirect(forbiddenTest);
    } else if (notAllowed.includes(request.url)) {
      return NextResponse.redirect(forbidden);
    }
  } else {
    return NextResponse.next();
  }
};

export default middleware;

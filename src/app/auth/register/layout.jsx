"use client";
import { AuthProvider } from "@/app/hooks/context/AuthContext";
import React from "react";

const RegisterLayout = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default RegisterLayout;

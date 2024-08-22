"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import React from "react";
import { AuthProvider } from "../hooks/context/AuthContext";
import useHttp from "../hooks/useHttp";
import { baseAPI } from "@/constants/domain";
import { URLS } from "@/constants/url";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const isUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("isLogin")) || null
      : null; // localStorage faqat client-side da mavjud
  const { request, loading, error } = useHttp();

  const isLoginUser = async () => {
    const url = baseAPI + URLS.profile;
    request(url, "GET")
      .then((response) => {
        console.log("respionse", response.id);
        console.log("respionse", response.email);
        if (response.id && response.email) {
          localStorage.setItem("isLogin", JSON.stringify(true));
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log("uxladi", err);
        localStorage.setItem("isLogin", JSON.stringify(false));
      });
  };

  useEffect(() => {
    if (isUser) {
      isLoginUser();
    }
  }, []);
  return (
    <>
      <Header />
      <AuthProvider>{children}</AuthProvider>
    </>
  );
};

export default AuthLayout;

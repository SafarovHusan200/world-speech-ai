"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import Header from "@/components/Header";
import React from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Yuklanayotgan paytda hech narsa qilmaydi
    if (session) router.push("/dashboard"); // Agar foydalanuvchi login qilgan bo'lsa, dashboard sahifasiga yo'naltiradi
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div>
        <Loading />{" "}
      </div>
    );
  }
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AuthLayout;

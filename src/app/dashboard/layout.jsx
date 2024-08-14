"use client";
import Sidebar from "@/components/SideBar";
import React, { useState, useEffect, Suspense } from "react";

import { useRouter } from "next/navigation";

import "../../styles/dashboard.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

const DashboardLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebar, setSidebar] = useState(false);

  const handleClick = () => {
    setSidebar(!sidebar);
  };

  function handleScroll() {
    setSidebar(false);
  }
  console.log("session-data:", session);

  useEffect(() => {
    if (status === "loading") return; // Yuklanayotgan paytda hech narsa qilmaydi
    if (!session) router.push("/auth/login"); // Agar foydalanuvchi login qilmagan bo'lsa, bosh sahifaga yo'naltiradi
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <Sidebar sidebar={sidebar} handleScroll={handleScroll} />

        <div className="dashboard__main" onScroll={() => handleScroll()}>
          <div className="sidebar-header">
            <Link href="/dashboard" className="logo">
              <img src="/logo-full-icon.svg" alt="icon" />
            </Link>
            <button className="sidebar-header-open" onClick={handleClick}>
              <img
                src={sidebar ? "/close-menu.svg" : "/menu-icon.svg"}
                alt="icon"
              />
            </button>
          </div>

          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

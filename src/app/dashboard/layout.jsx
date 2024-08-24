"use client";
import Sidebar from "@/components/SideBar";
import React, { useState, useEffect, Suspense } from "react";

import "../../styles/dashboard.css";
import Link from "next/link";

import Loading from "@/components/Loading";
import { DashboardProvider } from "../hooks/context/dashboardContext";
import useHttp from "../hooks/useHttp";
import { URLS } from "@/constants/url";
import { baseAPI } from "@/constants/domain";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const { request, loading, error } = useHttp();
  const isLogin =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("isLogin")) || null
      : null;
  const router = useRouter();

  const handleClick = () => {
    setSidebar(!sidebar);
  };

  function handleScroll() {
    setSidebar(false);
  }

  const isLoginUser = async () => {
    const url = baseAPI + URLS.profile;
    request(url, "GET")
      .then((response) => {
        console.log("respionse", response);
      })
      .catch((err) => {
        console.log("uxladi", err);
        localStorage.setItem("isLogin", JSON.stringify(false));
        localStorage.clear("token");
        localStorage.clear("refresh");
        router.push("/auth/login");
      });
  };

  useEffect(() => {
    isLoginUser();

    if (!isLogin) {
      router.push("/auth/login");
      localStorage.setItem("isLogin", JSON.stringify(false));
    }
  }, []);

  return (
    <div className="dashboard">
      <DashboardProvider>
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
      </DashboardProvider>
    </div>
  );
};

export default DashboardLayout;

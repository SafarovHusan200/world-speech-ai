"use client";
import Header from "@/components/Header";
import React from "react";

const CooperationLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default CooperationLayout;

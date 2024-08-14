import Header from "@/components/Header";
import React from "react";

const SupportLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default SupportLayout;

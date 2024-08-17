import Header from "@/components/Header";
import React from "react";

const MeetingLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MeetingLayout;

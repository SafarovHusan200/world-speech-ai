"use client";

import React, { useEffect } from "react";
import MeetingForm from "@/components/MeetingForm";
import { useSession } from "next-auth/react";
import { URLS } from "@/constants/url";
import { baseAPI } from "@/constants/domain";
import { useQuery } from "@tanstack/react-query";
import useHttp from "../hooks/useHttp";

const Dashboard = () => {
  const { request, loading, error } = useHttp();
  const { data: session, status } = useSession();
  const url = `${baseAPI + URLS.profile}`;
  console.log(url);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => request(url, "GET"),
    queryKey: ["movies"],
    enabled: !!session, // Only run the query if the session exists
  });

  console.log(data);
  return (
    <>
      <MeetingForm />
    </>
  );
};

export default Dashboard;

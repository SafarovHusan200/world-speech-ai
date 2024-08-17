"use client";
import { useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import { getData } from "@/lib/fetch";
import { URLS } from "@/constants/url";
import { baseAPI } from "@/constants/domain";

const Home = () => {
  const { data: session, status } = useSession();
  const url = `${baseAPI + URLS.tarif}`;
  console.log(url);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getData(url, session?.accessToken),
    queryKey: ["movies"],
    enabled: !!session, // Only run the query if the session exists
  });

  if (status === "loading" || isLoading) return <Loading />;
  if (isError) return <div>Sorry, there was an error</div>;

  return (
    <div className="container mx-auto">
      <h1 className="p-5 box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-center font-bold text-4xl">
        React Query Movies
      </h1>
      <div className="grid grid-cols-4 gap-4 p-10">
        {data?.map((movie) => (
          <table border="1" key={movie.id}>
            <tbody>
              <tr>
                <td>{"movie" + movie.id}</td>
                <td>{movie.name}</td>
                <td>{movie.price}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default Home;

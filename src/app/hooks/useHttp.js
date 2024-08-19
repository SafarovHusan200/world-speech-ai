// "use client";

// import React, { useCallback, useState } from "react";
// import axios from "axios";
// import { useSession } from "next-auth/react";

// const useHttp = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { data: session } = useSession();

//   const request = useCallback(
//     async (url, method = "GET", body = null, customHeaders = {}) => {
//       setLoading(true);
//       const token = session?.accessToken || null;

//       const headers = {
//         "Content-Type": "application/json",
//         ...customHeaders,
//       };

//       if (token) {
//         headers.Authorization = `Bearer ${token}`;
//       }

//       try {
//         const response = await axios({
//           url,
//           method,
//           headers,
//           data: body,
//         });
//         setLoading(false);
//         return response.data || response;
//       } catch (error) {
//         setLoading(false);

//         error.response.data?.code === "token_not_valid"; // session?.refreshToken orqali accessTokenni yangilaydigan funcsiya tuzib ber

//         setError(
//           error.response.data?.error ||
//             error.response.data?.code ||
//             "An error occurred"
//         );
//         throw (
//           error.response.data?.error ||
//           error.response.data?.code ||
//           "An error occurred"
//         );
//       }
//     },
//     [session]
//   );

//   const clearError = useCallback(() => setError(null), []);

//   return { loading, error, request, clearError };
// };

// export default useHttp;

"use client";

import React, { useCallback, useState } from "react";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post(
        "https://worldspeechai.com/api/v1/auth/jwt/refresh/",
        { refresh: refreshToken }
      );

      if (response.data?.access) {
        // Update session with new access token
        const newSession = {
          ...session,
          accessToken: response.data.access,
        };

        await signIn("credentials", { session: newSession, redirect: false });
        return response.data.access;
      }
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      throw new Error("Failed to refresh access token");
    }
  };

  const request = useCallback(
    async (url, method = "GET", body = null, customHeaders = {}) => {
      setLoading(true);
      const token = session?.accessToken || null;

      const headers = {
        "Content-Type": "application/json",
        ...customHeaders,
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      try {
        const response = await axios({
          url,
          method,
          headers,
          data: body,
        });
        setLoading(false);
        return response.data || response;
      } catch (error) {
        setLoading(false);
        if (
          error.response?.data?.code === "token_not_valid" &&
          session?.refreshToken
        ) {
          try {
            const newToken = await refreshAccessToken(session.refreshToken);
            headers.Authorization = `Bearer ${newToken}`;
            const retryResponse = await axios({
              url,
              method,
              headers,
              data: body,
            });
            return retryResponse.data || retryResponse;
          } catch (refreshError) {
            setError(
              refreshError.response?.data?.error ||
                refreshError.response?.data?.code ||
                "An error occurred"
            );
            throw refreshError;
          }
        }
        setError(
          error.response?.data?.error ||
            error.response?.data?.code ||
            "An error occurred"
        );
        throw error;
      }
    },
    [session, refreshAccessToken]
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};

export default useHttp;

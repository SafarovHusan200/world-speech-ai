// "use client";

// import React, { useCallback, useState } from "react";
// import axios from "axios";

// const useHttp = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const token = JSON.parse(localStorage.getItem("token")) || null;

//   const request = useCallback(
//     async (url, method = "GET", body = null, customHeaders = {}) => {
//       setLoading(true);

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

//         console.log(error.response.data?.detail);
//         // error.response.data?.code === "token_not_valid"; // session?.refreshToken orqali accessTokenni yangilaydigan funcsiya tuzib ber

//         setError(
//           error.response.data?.error ||
//             error.response.data?.code ||
//             error.response.data?.detail ||
//             "An error occurred"
//         );
//         throw (
//           error.response.data?.error ||
//           error.response.data?.code ||
//           error.response.data?.detail ||
//           "An error occurred"
//         );
//       }
//     },
//     [token]
//   );

//   const clearError = useCallback(() => setError(null), []);

//   return { loading, error, request, clearError };
// };

// export default useHttp;
"use client";

import React, { useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const useHttp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("token")) || null
      : null; // localStorage faqat client-side da mavjud

  // Yangi accessToken olish uchun funksiyani yaratish
  const refreshAccessToken = async () => {
    try {
      const refreshToken = JSON.parse(localStorage.getItem("refresh"));
      console.log("refreshToken", refreshToken);
      const response = await axios.post(
        "https://worldspeechai.com/api/v1/auth/jwt/refresh/",
        {
          refresh: refreshToken,
        }
      );

      const newAccessToken = response.data.access;
      localStorage.setItem("token", JSON.stringify(newAccessToken));

      return newAccessToken;
    } catch (error) {
      router.push("/auth/login");
      console.error("Refresh token failed:", error);
      localStorage.clear("token");
      localStorage.clear("refresh");
      localStorage.setItem("isLogin", JSON.stringify(false));
      // Agar refreshToken ham yaroqsiz bo'lsa, foydalanuvchini qayta login qilishga yo'naltirish
      // window.location.href = "/login"; // Optional: login sahifasiga yo'naltirish
      throw error;
    }
  };

  const request = useCallback(
    async (url, method = "GET", body = null, customHeaders = {}) => {
      setLoading(true);

      const headers = {
        "Content-Type": "application/json",
        ...customHeaders,
      };

      let authToken = token;

      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
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

        console.log("1-eror", error);

        if (
          error.response?.data?.detail ===
            "Учетные данные не были предоставлены." ||
          error.response?.data?.code === "token_not_valid"
        ) {
          try {
            // Yangi accessToken olish
            const newToken = await refreshAccessToken();
            console.log("newToken", newToken);
            // Yangi token bilan so'rovni qayta yuborish
            headers.Authorization = `Bearer ${newToken}`;
            const retryResponse = await axios({
              url,
              method,
              headers,
              data: body,
            });
            setLoading(false);
            return retryResponse.data || retryResponse;
          } catch (refreshError) {
            setError(
              refreshError.response?.data?.error ||
                refreshError.response?.data?.code ||
                refreshError.response?.data?.detail ||
                "An error occurred"
            );
            throw refreshError;
          }
        } else {
          let err =
            error?.response?.data.error ||
            error?.response?.data?.code ||
            error?.response?.data.detail ||
            "An error occurred";
          setError(err);
          console.log("2-eror", err);
          throw err;
        }
      }
    },
    [token]
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};

export default useHttp;

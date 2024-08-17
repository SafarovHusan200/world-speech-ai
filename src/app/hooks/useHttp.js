import React, { useCallback, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

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
        console.log(error);
        setError(
          error.response.data?.error ||
            error.response.data?.code ||
            "An error occurred"
        );
        throw error.response?.data?.error || "An error occurred";
      }
    },
    [session]
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};

export default useHttp;

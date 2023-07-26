import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequeste = useCallback(async (requesteConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requesteConfig.url, {
        method: requesteConfig.method ? requesteConfig.method : "GET",
        headers: requesteConfig.headers ? requesteConfig.headers : {},
        body: requesteConfig.body ? JSON.stringify(requesteConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      // function for transform
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    sendRequeste,
    isLoading,
    error,
  };
};

export default useHttp;

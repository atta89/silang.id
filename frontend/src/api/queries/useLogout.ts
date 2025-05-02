import { useState } from "react";
import axios, { AxiosError } from "axios";
import { LogoutResponse } from "../types";

const useLogout = () => {
  const [data, setData] = useState<LogoutResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError<Error>>();

  async function logout(): Promise<LogoutResponse> {
    setLoading(true);
    try {
      const { data: result } = await axios.post("/auth/logout");
      setData(result);
      return result;
    } catch (err) {
      const errors = err as AxiosError<Error>;
      setError(errors);
      throw errors;
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
    logout,
  };
};

export default useLogout;

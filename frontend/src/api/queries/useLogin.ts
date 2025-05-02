import { useState } from "react";
import axios, { AxiosError } from "axios";
import { LoginRequest, LoginResponse } from "../types";

const useLogin = () => {
  const [data, setData] = useState<LoginResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError<Error>>();

  async function login(input: LoginRequest): Promise<LoginResponse> {
    setLoading(true);
    try {
      const { data: result } = await axios.post("/auth/login", input);
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
    login,
  };
};

export default useLogin;

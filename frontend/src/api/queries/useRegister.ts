import { useState } from "react";
import axios, { AxiosError } from "axios";
import { RegisterRequest, RegisterResponse } from "../types";

const useRegister = () => {
  const [data, setData] = useState<RegisterResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError<Error>>();

  async function register(input: RegisterRequest): Promise<RegisterResponse> {
    setLoading(true);
    try {
      const { data: result } = await axios.post("/auth/register", input);
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
    register,
  };
};

export default useRegister;

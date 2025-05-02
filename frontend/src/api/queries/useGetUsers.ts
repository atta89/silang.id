import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import { User } from "../types";

const useGetUsers = () => {
  const [data, setData] = useState<User[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError<Error>>();

  const getUsers = useCallback(async (): Promise<User[]> => {
    setLoading(true);
    try {
      const { data: result } = await axios.get("/users");
      setData(result);
      return result;
    } catch (err) {
      const errors = err as AxiosError<Error>;
      setError(errors);
      throw errors;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    getUsers,
  };
};

export default useGetUsers;

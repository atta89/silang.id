import { useState } from "react";
import axios, { AxiosError } from "axios";
import { User, UserRequest } from "../types";

const useAddUser = () => {
  const [data, setData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError<Error>>();

  async function addUser(input: UserRequest): Promise<User> {
    setLoading(true);
    try {
      const { data: result } = await axios.post("/users", input);
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
    addUser,
  };
};

export default useAddUser;

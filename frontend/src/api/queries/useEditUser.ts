import { useState } from "react";
import axios, { AxiosError } from "axios";
import { User, UserRequest } from "../types";

const useEditUser = () => {
  const [data, setData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError<Error>>();

  async function editUser(input: UserRequest, id?: string): Promise<User> {
    setLoading(true);
    try {
      const { data: result } = await axios.put("/users/" + id, input);
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
    editUser,
  };
};

export default useEditUser;

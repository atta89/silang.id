import { useState } from "react";
import axios, { AxiosError } from "axios";
import { DeleteUserResponse } from "../types";

const useDeleteUser = () => {
  const [data, setData] = useState<DeleteUserResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError<Error>>();

  async function deleteUser(id: string): Promise<DeleteUserResponse> {
    setLoading(true);
    try {
      const { data: result } = await axios.delete("/users/" + id);
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
    deleteUser,
  };
};

export default useDeleteUser;

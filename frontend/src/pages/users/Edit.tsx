import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { Navbar } from "../../components";
import { useEditUser, useGetDetailUser, UserRequest } from "../../api";
import { useEffect } from "react";

const Add = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editUser, error } = useEditUser();
  const { data, getUser } = useGetDetailUser();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: data?.name || "",
      email: data?.email || "",
    } as UserRequest,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await editUser(values, id);
      navigate("/");
    },
  });

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [getUser, id]);

  return (
    <>
      <Navbar />
      <Box mt={4} mx="auto" maxWidth={1080}>
        <Typography mb={2} variant="h6">
          Edit User
        </Typography>
        <Box mx="auto" maxWidth={520}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              type="text"
              size="small"
              margin="dense"
              placeholder="Masukkan nama"
              value={values.name}
              onChange={handleChange("name")}
              error={!!error?.message}
            />
            <TextField
              fullWidth
              required
              type="email"
              size="small"
              margin="dense"
              placeholder="Masukkan email"
              value={values.email}
              onChange={handleChange("email")}
              error={!!error?.message}
              helperText={error?.message}
            />
            <FormControl fullWidth margin="dense">
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ borderRadius: 2 }}
              >
                Simpan
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Add;

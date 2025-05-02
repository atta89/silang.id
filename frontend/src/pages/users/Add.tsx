import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { Navbar } from "../../components";
import { useAddUser, UserRequest } from "../../api";

const Add = () => {
  const navigate = useNavigate();
  const { addUser, error } = useAddUser();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    } as UserRequest,
    onSubmit: async (values) => {
      await addUser(values);
      navigate("/");
    },
  });

  return (
    <>
      <Navbar />
      <Box mt={4} mx="auto" maxWidth={1080}>
        <Typography mb={2} variant="h6">
          Tambah User
        </Typography>
        <Box mx="auto" maxWidth={520}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              type="text"
              size="small"
              margin="dense"
              label="Name"
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
              label="Email"
              placeholder="Masukkan email"
              value={values.email}
              onChange={handleChange("email")}
              error={!!error?.message}
            />
            <TextField
              fullWidth
              required
              size="small"
              margin="dense"
              type="password"
              label="Password"
              placeholder="Masukkan password"
              value={values.password}
              onChange={handleChange("password")}
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

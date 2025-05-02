import { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { RegisterRequest, useRegister } from "../api";
import { useFormik } from "formik";

const Register = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const { register, error } = useRegister();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    } as RegisterRequest,
    onSubmit: async (values) => {
      const { access_token } = await register(values);
      localStorage.setItem("accessToken", access_token);
      const redirectTo = location.state?.redirectTo || '/'
      navigate(redirectTo)
    },
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Box
      display="flex"
      minWidth="100vw"
      minHeight="100vh"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            maxWidth: { xs: "100%", md: 360 },
            bgcolor: { xs: "transparent", md: "white" },
          }}
        >
          <img width={48} height={48} alt="vite" src="/vite.svg" />
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
          />
          <TextField
            fullWidth
            required
            size="small"
            margin="dense"
            type="password"
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
              Daftar
            </Button>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <Typography variant="body2">
              Sudah punya akun? <Link href="/login">Masuk disini</Link>
            </Typography>
          </FormControl>
        </Paper>
      </form>
    </Box>
  );
};

export default Register;

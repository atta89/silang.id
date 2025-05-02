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
import { useFormik } from "formik";
import { LoginRequest, useLogin } from "../api";
import { useEffect } from "react";

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const { login, error } = useLogin();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    } as LoginRequest,
    onSubmit: async (values) => {
      const { access_token } = await login(values);
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
              Masuk
            </Button>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <Typography variant="body2">
              Belum punya akun? <Link href="/register">Daftar disini</Link>
            </Typography>
          </FormControl>
        </Paper>
      </form>
    </Box>
  );
};

export default Login;

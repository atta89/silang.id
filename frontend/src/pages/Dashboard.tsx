import { AccountCircle, Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDeleteUser, useGetUsers, User } from "../api";
import { Navbar } from "../components";

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const { data, getUsers } = useGetUsers();
  const { deleteUser } = useDeleteUser();

  const handleOpen = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedUser(undefined);
    setOpen(false);
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <Navbar />
      <Box mt={4} mx="auto" maxWidth={1080}>
        <Stack
          mb={2}
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Daftar User</Typography>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => navigate("/users/add")}
            sx={{ textTransform: "capitalize" }}
          >
            Tambah User
          </Button>
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {data?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell width={68}>
                    <AccountCircle color="disabled" fontSize="large" />
                  </TableCell>
                  <TableCell>
                    {row.name}
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      #{row.id}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => navigate(`/users/${row.id}`)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleOpen(row)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              if (!selectedUser) return;
              deleteUser(selectedUser.id).then(() => {
                getUsers();
                handleClose();
              });
            },
          },
        }}
      >
        <DialogTitle>Hapus User</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah anda yakin ingin menghapus user <b>{selectedUser?.email}</b>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button variant="contained" color="error" type="submit">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;

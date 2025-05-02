import { useNavigate } from "react-router";
import { useLogout } from "../api";
import { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box display="flex">
      <AppBar position="sticky" color="transparent">
        <Toolbar sx={{ gap: 2 }}>
          <img width={36} height={36} alt="vite" src="/vite.svg" />
          <Box flexGrow={1}>
            <Typography variant="h6">Dashboard</Typography>
          </Box>
          <IconButton onClick={handleOpenMenu}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        slotProps={{
          paper: { sx: { width: 160 } },
        }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout color="inherit" />
          </ListItemIcon>
          <Typography lineHeight={2}>Keluar</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;

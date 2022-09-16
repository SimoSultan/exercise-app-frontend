import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";

import { HEADER_HEIGHT } from "../../styles/styles";
import { Link } from "react-router-dom";
import { useExerciseContext } from "../../store/context";
import { ACTIONS } from "../../store/initialState";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/api";

export default function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { state, dispatch } = useExerciseContext();
  const { isAuthenticated } = state;
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickAuth = async () => {
    if (isAuthenticated) {
      await logoutUser();
      dispatch({ type: ACTIONS.LOGOUT });
    } else {
      navigate("/login");
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" sx={{ height: HEADER_HEIGHT }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit", flex: 1 }}
          >
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", flex: 1 },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
              }}
            >
              Sixty6
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Your Profile">
                  <PersonIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link
                to="profile"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Link>
              <MenuItem onClick={handleClickAuth}>
                <Typography textAlign="center">
                  {isAuthenticated ? "Logout" : "Login"}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

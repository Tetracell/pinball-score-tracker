import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { AddPlayerDrawer } from "./AddPlayerDrawer";
import { AddScoreDrawer } from "./AddScoreDrawer";
const sanctumLogo = require("../13082625_805039766292952_7729151040459603827_n.png");

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      className="navbar"
      sx={{ backgroundColor: "black" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="medium"
            edge="start"
            onClick={() => {
              navigate("/");
            }}
          >
            <Container sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <img src={sanctumLogo} alt="logo" height={80} width={80} />
            </Container>
          </IconButton>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sanctum Score Tracker
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Button
                sx={{
                  textAlign: "center",
                  justifyContent: "center"
                }}
                onClick={() => {
                  navigate("/tables");
                  handleCloseNavMenu();
                }}
              >
                  Tables
              </Button>
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                }}
              >
                <AddPlayerDrawer />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                }}
              >
                <AddScoreDrawer />
              </MenuItem>
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleMenuNav(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <img src={sanctumLogo} alt="logo" height={60} width={60} />
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Scores
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/tables");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Tables
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// import React from "react";

// import { useNavigate } from "react-router-dom";
// import "../styles/nav.css";

// //MUI
// import {
//   AppBar,
//   Box,
//   Typography,
//   Menu,
//   MenuIcon,
//   Container,
//   Tooltip,
//   MenuItem,
//   Toolbar,
//   IconButton,
//   Stack,
//   Button,
// } from "@mui/material";

// import { AddPlayerDrawer } from "./AddPlayerDrawer"; ✓
// import { AddScoreDrawer } from "./AddScoreDrawer"; ✓
// const sanctumLogo = require("../13082625_805039766292952_7729151040459603827_n.png");

// export const Navbar = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <AppBar
//         className="navbar"
//         position="sticky" ✓
//         sx={{ backgroundColor: "black" }} ✓
//       >
//         <Toolbar>
//           <IconButton
//             size="medium"
//             edge="start"
//             onClick={() => {
//               navigate("/");
//             }}
//           >
//             <img src={sanctumLogo} alt="logo" height={80} width={80} />
//           </IconButton>

//           <Stack direction="row" spacing={2}>
//             <Button
//               color="inherit"
//               onClick={() => {
//                 navigate("/tables");
//               }}
//             >
//               Tables
//             </Button>
//             <Button
//               color="inherit"
//               onClick={() => {
//                 navigate("/players");
//               }}
//             >
//               Players
//             </Button>
//             <AddPlayerDrawer onClick={console.log("clicked")}/>
//             <AddScoreDrawer/>
//           </Stack>
//         </Toolbar>
//       </AppBar>
//     </>
//   );
// };

import React from "react";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/nav.css";

//MUI
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Drawer,
  Box,
} from "@mui/material";

import { AddPlayerDrawer } from "./AddPlayerDrawer";
const sanctumLogo = require("../13082625_805039766292952_7729151040459603827_n.png");

export const Navbar = () => {
  const navigate = useNavigate();
  const [createVis, setCreateVis] = React.useState(false);

  const createPlayerDrawer = (visible) => {
    setCreateVis(visible);
    return (
      <Drawer
        anchor="left"
        open={createVis}
        onClose={() => setCreateVis(false)}
      >
        <Box width="250px" textAlign="center" role="presentation">
          <Typography variant="h6" component="div">
            Side Panel!
          </Typography>
        </Box>
      </Drawer>
    );
  };

  return (
    <>
      <AppBar
        className="navbar"
        position="sticky"
        sx={{ backgroundColor: "black" }}
      >
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={sanctumLogo} alt="logo" height={80} width={80} />
          </IconButton>

          <Stack direction="row" spacing={2}>
            <Button
              color="inherit"
              onClick={() => {
                navigate("/tables");
              }}
            >
              Tables
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                navigate("/players");
              }}
            >
              Players
            </Button>
            <AddPlayerDrawer/>
            <Button color="inherit">Add Score</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

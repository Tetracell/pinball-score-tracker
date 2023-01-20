import React from "react";

import { useNavigate } from "react-router-dom";
import "../styles/nav.css";

//MUI
import {
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Button,
} from "@mui/material";

import { AddPlayerDrawer } from "./AddPlayerDrawer";
import { AddScoreDrawer } from "./AddScoreDrawer";
const sanctumLogo = require("../13082625_805039766292952_7729151040459603827_n.png");

export const Navbar = () => {
  const navigate = useNavigate();


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
            <AddPlayerDrawer onClick={console.log("clicked")}/>
            <AddScoreDrawer/>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

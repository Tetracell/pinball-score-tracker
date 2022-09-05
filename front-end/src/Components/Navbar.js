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
} from "@mui/material";

const sanctumLogo = require("../13082625_805039766292952_7729151040459603827_n.png");

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar className="navbar" position="sticky" sx={{"backgroundColor": "black"}}>
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={sanctumLogo} alt="logo" height={65} width={65} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sanctum Score Dungeon
          </Typography>
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
            <Button color="inherit">Create Player</Button>
            <Button color="inherit">Add Score</Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {/* <h1>I AM THE NAVBAR! KNEEL BEFORE ME AND WEEP</h1>
      <Link to="/">Home</Link>
      <Link to="/tables">Tables</Link>
      <Link to="/players">Players</Link> */}
    </>
  );
};

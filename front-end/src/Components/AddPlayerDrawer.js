import React from "react";
import axios from "axios";

import {
  Button,
  Typography,
  Drawer,
  Box,
  TextField,
} from "@mui/material";

const API = process.env.REACT_APP_API_URL;

export const AddPlayerDrawer = () => {
  const [visible, setVisible] = React.useState(false);
  const [newPlayer, setNewPlayer] = React.useState({
    initials: "",
    name: "",
  });

  // I'd like to create a validation function that will go through the initials, and if
  // any unsupported characters are in there, alert the user to please re-do their entry.
  // This will depend on the font being used

  const handleSubmit = () => {
    if (!newPlayer.initials || newPlayer.initials.length > 3) {
      alert("Initials are required, can only be 3 characters");
      return;
    } else if (!newPlayer.name) {
      alert("Name is required");
    } else {
      addPlayer();
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.id]: e.target.value });
  };

  const addPlayer = () => {
    axios
      .post(`${API}/players/new`, newPlayer)
      .then((res) => {
        setNewPlayer(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setVisible(false);
  };

  return (
    <>
      <Button color="inherit" onClick={() => setVisible(true)}>
        Create Player
      </Button>
      <Drawer temporary anchor="left" open={visible} onClose={handleClose}>
        <Box p={2} width="250px" textAlign="center" component="form">
          <Typography variant="h5">Add a Player</Typography>
          <TextField
            id="initials"
            label="Initials (3 characters)"
            variant="outlined"
            value={newPlayer.initials}
            onChange={handleChange}
            sx={{ marginBottom: "15px", marginTop: "15px" }}
            required
          />
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={newPlayer.name}
            onChange={handleChange}
            required
          />
          <Button onClick={handleSubmit}>Add Player</Button>
          <Button onClick={handleClose}>Close Window</Button>
        </Box>
      </Drawer>
    </>
  );
};

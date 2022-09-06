import React from "react";
import axios from "axios";

import {
  Button,
  Typography,
  Drawer,
  Box,
  FormControlLabel,
  TextField,
} from "@mui/material";

const API = process.env.REACT_APP_API_URL;

export const AddPlayerDrawer = () => {
  const [visible, setVisible] = React.useState(false);
  const [newPlayer, setNewPlayer] = React.useState({
    initials: "",
    name: null,
  });

  const handleSubmit = () => {
    if (!newPlayer.initials) {
      alert("Initials are required");
      return;
    } else {
      addPlayer();
    }
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
        <Drawer anchor="left" open={visible} onClose={() => setVisible(false)}>
          <Box p={2} width="250px" textAlign="center" component="form">
            <Typography variant="h5">Add a Player</Typography>
            <TextField
              id="initials"
              label="Initials"
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
            <Button onClick={() => setVisible(false)}>Close Window</Button>
          </Box>
        </Drawer>
      </Button>
    </>
  );
};

import React from "react";
import axios from "axios";

import {
  Button,
  Drawer,
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const API = process.env.REACT_APP_API_URL;

export const AddScoreDrawer = () => {
  const [visible, setVisible] = React.useState(false);
  const [players, setPlayers] = React.useState([{}]);
  const [tables, setTables] = React.useState([{}]);
  const [newScore, setNewScore] = React.useState({
    score: 0,
    player: 0,
    machine: 0,
  });

  const getData = () => {
    axios.get(`${API}/tables`).then((res) => {
      setTables(res.data.payload);
    });
    axios.get(`${API}/players`).then((res) => {
      setPlayers(res.data.payload);
    });
  };

  const handleSubmit = () => {
    if (!newScore.score || !newScore.player || newScore.machine) {
      alert("Please make sure all fields are filled before submitting");
      return;
    } else {
      addScore();
    }
  };
  const handleClose = () => {
    setVisible(false);
  };

  const handleChange = (e) => {
    //player id from dropdown menu
    //machine id from dropdown menu
    //score is a text box (number);
  };

  const handleSelect = (e) => {};

  const addScore = () => {
    axios
      .post(`${API}/score/new`, newScore)
      .then((res) => {
        setNewScore(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setVisible(false);
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={() => {
          setVisible(true);
          getData();
        }}
      >
        Add Score
      </Button>
      <Drawer anchor="right" open={visible} onClose={handleClose}>
        <Box p={2} width="250px" textAlign="center" component="form">
          <Typography variant="h5" sx={{ marginBottom: "5px" }}>
            Add New Score
          </Typography>
          <InputLabel id="player-select-menu">Choose Player</InputLabel>
          <Select
            labelId="player-select-menu"
            id="player-select"
            onChange={handleSelect}
          >
            {players.map((player) => {
              return (
                <MenuItem value={player.playerid}>
                  <strong>{player.initials}</strong> - {player.name}
                </MenuItem>
              );
            })}
          </Select>
          <br />
          <InputLabel id="table-select-menu">Choose Table</InputLabel>
          <Select
            labelId="table-select-menu"
            id="table-select"
            onChange={handleSelect}
          >
            {tables.map((table) => {
              return (
                <MenuItem value={table.machineid}>
                  {table.name}: {table.manufacturer}
                </MenuItem>
              );
            })}
          </Select>
          <br />
          <br />
          <InputLabel id="score-input-field">Enter Score</InputLabel>
          <TextField labelId="score-input-field" type="number"></TextField>
          <Button>Submit Score</Button>
          <Button onClick={handleClose}>Close Window</Button>
        </Box>
      </Drawer>
    </>
  );
};

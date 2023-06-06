import React from "react";
import axios from "axios";
import "../styles/AddScoreDrawer.css";

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
    score: "",
    player: "",
    machine: "",
  });

  const getData = () => {
    axios.get(`${API}/tables`).then((res) => {
      setTables(res.data.payload);
    });
    axios.get(`${API}/players`).then((res) => {
      setPlayers(res.data.payload);
    });
  };

  const handleSubmit = (e) => {
    if (!newScore.score || !newScore.machine || !newScore.player) {
      alert("Please make sure all fields are filled before submitting");
      return;
    }
    addScore();
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleChangeScore = (e) => {
    setNewScore({ ...newScore, score: e.target.value });
  };

  const handleChangeTable = (e) => {
    setNewScore({ ...newScore, machine: e.target.value });
  };

  const handleChangePlayer = (e) => {
    setNewScore({ ...newScore, player: e.target.value });
  };

  const addScore = () => {
    axios
      .post(`${API}/scores/new`, newScore)
      .then((res) => {
        setNewScore(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    alert("Score submitted!");
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
      <Drawer
        anchor="right"
        open={visible}
        onClose={handleClose}
        id="scoreDrawer"
        PaperProps={{
          sx: {
            backgroundColor: "#151615",
            // https://stackoverflow.com/questions/69517179/changing-color-of-drawer-in-mui-v5
          },
        }}
      >
        <Box
          p={2}
          width="250px"
          textAlign="center"
          component="form"
          onSubmit={handleSubmit}
          color="white"
        >
          <Typography variant="h5" sx={{ marginBottom: "5px" }}>
            Add New Score
          </Typography>
          {choosePlayer()}
          <br />
          <br />
          {chooseTable()}
          <br />
          <br />
          {enterScore()}
          <br />
          <br />
          <Button type="submit" id="submit-score-button">
            Submit Score
          </Button>
          <br />
          <br />
          <Button onClick={handleClose}>Close Window</Button>
        </Box>
      </Drawer>
    </>
  );

  //Current issue with submitting scores on iOS devices : unsure if this is a problem
  // with React or MUI, but the submit button doesn't seem to properly fire an event
  // unless there is a 'cursor: pointer' css style attached to the button, making
  // the browser realize that a button has been pressed.

  function choosePlayer() {
    return (
      <>
        <InputLabel id="player-select-menu" sx={{ color: "lightblue" }}>
          Choose Player
        </InputLabel>
        <Select
          labelId="player-select-menu"
          id="player"
          variant="outlined"
          sx={{ color: "lightblue", outline: "blue" }}
          onChange={handleChangePlayer}
          value={newScore.player}
        >
          {players.map((player) => {
            return (
              <MenuItem value={player.playerid}>
                <strong>{player.initials}</strong> - {player.name}
              </MenuItem>
            );
          })}
        </Select>
      </>
    );
  }

  function chooseTable() {
    return (
      <>
        <InputLabel id="table-select-menu" sx={{ color: "lightblue" }}>
          Choose Table
        </InputLabel>
        <Select
          labelId="table-select-menu"
          id="machine"
          onChange={handleChangeTable}
          label="Table"
          value={newScore.machine}
          sx={{ color: "lightblue" }}
        >
          {tables.map((table) => {
            return <MenuItem value={table.machineid}>{table.name}</MenuItem>;
          })}
        </Select>
      </>
    );
  }

  function enterScore() {
    return (
      <>
        <InputLabel id="score-input-field" sx={{ color: "lightblue" }}>
          Enter Score
        </InputLabel>
        <TextField
          labelId="score-input-field"
          id="score"
          type="number"
          onChange={handleChangeScore}
          value={newScore.score}
        ></TextField>
      </>
    );
  }
};

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
  //For the GET request for players and tables
  const [players, setPlayers] = React.useState([{}]);
  const [tables, setTables] = React.useState([{}]);

  const [chosenPlayer, setChosenPlayer] = React.useState();
  const [chosenTable, setChosenTable] = React.useState();
  const [score, setScore] = React.useState();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewScore({ score: score, player: chosenPlayer, machine: chosenTable });
    if (!score || !chosenTable || !chosenPlayer) {
      alert("Please make sure all fields are filled before submitting");
      return;
    }
    addScore();
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleChangeScore = (e) => {
    setScore(Number(e.target.value)); //Coming in a string because...?
  };
  const handleChangeTable = (e) => {
    setChosenTable(e.target.value);
    console.log(chosenTable + "Chosen Table ID");
  };
  const handleChangePlayer = (e) => {
    setChosenPlayer(e.target.value);
    console.log(chosenPlayer + "Chosen Player ID");
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
    setVisible(false);
    console.log(newScore);
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
        <Box
          p={2}
          width="250px"
          textAlign="center"
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" sx={{ marginBottom: "5px" }}>
            Add New Score
          </Typography>
          <InputLabel id="player-select-menu">Choose Player</InputLabel>
          <Select
            labelId="player-select-menu"
            id="player"
            onChange={handleChangePlayer}
            value={chosenPlayer}
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
            id="machine"
            onChange={handleChangeTable}
            label="Table"
            value={chosenTable}
          >
            {tables.map((table) => {
              return <MenuItem value={table.machineid}>{table.name}</MenuItem>;
            })}
          </Select>
          <br />
          <br />
          <InputLabel id="score-input-field">Enter Score</InputLabel>
          <TextField
            labelId="score-input-field"
            id="score"
            type="number"
            onChange={handleChangeScore}
            value={score}
          ></TextField>
          <Button type="submit">Submit Score</Button>
          <Button onClick={handleClose}>Close Window</Button>
          <Button onClick={() => {
            console.log(chosenPlayer + " " + chosenTable + " " + score)
          }}>DEBUG BUTTON</Button>
        </Box>
      </Drawer>
    </>
  );
};

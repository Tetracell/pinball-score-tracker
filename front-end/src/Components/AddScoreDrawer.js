import React from "react";
import axios from "axios";

import { Button, Drawer, Box, TextField } from "@mui/material";

const API = process.env.REACT_APP_API_URL;

export const AddScoreDrawer = () => {
  const [visible, setVisible] = React.useState(false);
  const [players, setPlayers] = React.useState([{}]);
  const [tables, setTables] = React.useState([{}]);
  const [newScore, setNewScore] = React.useState({
    score: 0,
    player: null,
    machine: null,
  });

  React.useEffect(() => {
    axios   
        .get((`${API}/players`))
        .then((res) => {
            setPlayers(res.data.payload)
        })
        .get((`${API}/machines`))
        .then((res) => {
            setTables(res.data.payload)
        })

  }, [])
  

  const handleSubmit = () => {
    if (!newScore.score || !newScore.player || newScore.machine) {
        alert("Please make sure all fields are filled before submitting");
        return;
    } else {
        addScore();
    }
  }
  const handleClose = () => {
    setVisible(false);
  }

  const handleChange = (e) => {
    //player id from dropdown menu
    //machine id from dropdown menu
    //score is a text box (number);
  }

  const addScore = () => {
    axios.post(`${API}/score/new`, newScore)
    .then((res) => {
        setNewScore(res.data);
    })
    .catch((error) => {
        console.log(error);
    })
    setVisible(false);
  }

  return (
    <>
        <Button color="inherit" onClick={() => setVisible(true)}>
            Add Score
        </Button>
    </>
  )
};

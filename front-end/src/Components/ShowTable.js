import React from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import "../fonts/pinball-data.pinball.ttf";
import "../styles/highscores.css";

//MUI
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { padding } from "@mui/system";

export const ShowTable = ({ API }) => {
  //const navigate = useNavigate();
  const titles = [
    "Grand Champion",
    "First Place",
    "Second Place",
    "Third Place",
  ];
  const [table, setTable] = React.useState({});
  const [topFour, setTopFour] = React.useState([{}]);
  const [players, setPlayers] = React.useState([{}]);
  const [scores, setScores] = React.useState([{}]);

  const { machineid } = useParams();

  React.useEffect(() => {
    axios.get(`${API}/tables/${machineid}`).then((res) => {
      setTable(res.data.payload);
      setTopFour(res.data.topscores);
      setScores(res.data.scores);
    });
    axios.get(`${API}/players`).then((res) => {
      setPlayers(res.data.payload);
    });
  });

  const playerSearch = (id) => {
    let foundPlayer = [];
    players.forEach((player) => {
      if (player.playerid === id) {
        foundPlayer.push(player.name);
        foundPlayer.push(player.initials);
      }
    });
    return foundPlayer;
  };

  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "lightgreen",
            border: "1px solid",
            "border-radius": "40px",
            backgroundColor: "#23432a",
          }}
        >
          {table.name} <br></br> {table.manufacturer}, {table.prod_year}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
            "margin-top": "10px",
            "text-decoration": "underline",
          }}
        ></Grid>
        {topFour.map((score, index) => {
          const player = score.player;
          const playerScore = score.score;
          let colW;

          index !== 0 ? (colW = 4) : (colW = 12);
          return (
            <Grid
              item
              xs={colW}
              sx={{
                textAlign: "center",
                border: "1px solid green",
                paddingTop: "5px",
              }}
            >
              <strong>{titles[index]}</strong>
              <br />
              <initials>{playerSearch(player)[1]}</initials>
              <br />
              {playerScore}
            </Grid>
          );
        })}
        <p>ALL OTHER SCORES</p>
        {scores.map((score, index) =>
          index > 4 ? (
            <p>
              {score.score} - {playerSearch(score.player)[0]}{" "}
              <initials>{playerSearch(score.player)[1]}</initials>
            </p>
          ) : null
        )}
      </Grid>
    </Box>
  );
};

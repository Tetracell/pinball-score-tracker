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

export const ShowTable = ({ API }) => {
  //const navigate = useNavigate();
  const titles = ["Grand Champion", "Score #1", "Score #2", "Score #3"];
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
  }, [API, machineid]);

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
          sx={{ textAlign: "center", fontSize: "40px", color: "lightgreen" }}
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
        >
          <strong>TOP SCORES</strong>
        </Grid>
        {topFour.map((score, index) => {
          const player = score.player;
          return (
            <div>
              <p>
                <strong>{titles[index]}</strong> : {score.score} -{" "}
                {playerSearch(player)[0]}{" "}
                <initials>{playerSearch(player)[1]}</initials>
              </p>
            </div>
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

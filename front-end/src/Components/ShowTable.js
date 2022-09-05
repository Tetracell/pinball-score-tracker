import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import "../fonts/pinball-data.pinball.ttf";
import "../styles/highscores.css";

//MUI
import { Box, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";


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

              <div id="top-initials">{playerSearch(player)[1]}</div>
              <div id="score">{playerScore}</div>
            </Grid>
          );
        })}
        <Grid item xs={3}/>
        <Grid item xs={6} sx={{"text-align":"center"}}>
          <Typography sx={{
            paddingTop:"10px",
            fontFamily: "monospace",
            fontSize:"15px",
            textDecoration:"underline"
          }}>
            Other Scores
          </Typography>
          <div id="other-scores">
            <Table>
              <TableBody>
                <TableRow id="columns">
                  <TableCell
                    sx={{ color: "white", textDecoration: "underline" }}
                  >
                    Initials
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", textDecoration: "underline" }}
                  >
                    Score
                  </TableCell>
                </TableRow>
                {scores.map((score, index) => {
                  if (index > 4) {
                    return (
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "orangered",
                            "font-family": "gas",
                            fontSize: "40px",
                          }}
                        >
                          {playerSearch(score.player)[1]}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "orange",
                            "font-family": "gas",
                            fontSize: "40px",
                          }}
                        >
                          {score.score}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </div>
        </Grid>
        <Grid item xs={3}/>
      </Grid>
    </Box>
  );
};

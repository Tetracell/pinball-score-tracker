import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import "../fonts/Squad3DRegular-Yzaov.ttf"; // don't think i need to import this again here
import "../styles/highscores.css";

//MUI
import { Box, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const ShowTable = ({ API }) => {
  const titles = [
    "Grand Champion",
    "1st Place",
    "2nd Place",
    "3rd Place",
  ];
  const emojis = ["👑", "🥇", "🥈", "🥉"];
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
    /* eslint-disable-next-line */
  }, []);

  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            // backgroundColor: "#23432a",
            // border: "1px dotted",
            borderColor: "greenyellow",
            borderRadius: "4px",
          }}
        >
          <div id="title">{table.name}</div>
          <div id="details">
            {table.manufacturer}, {table.prod_year}
          </div>
          {table.designer !== "designer_placeholder" ? (
            <div id="designer">Designed by: {table.designer}</div>
          ) : null}
          <div id="small-details">
            {table.type} | Players: {table.players} | Balls: {table.balls}
          </div>
        </Grid>
        {topScores(topFour)}
        <Grid item xs={3} />
        {moreScores(scores)}
        <Grid item xs={3} />
      </Grid>
    </Box>
  );

  function playerSearch(id) {
    let foundPlayer = [];
    players.forEach((player) => {
      if (player.playerid === id) {
        foundPlayer.push(player.name);
        foundPlayer.push(player.initials);
      }
    });
    return foundPlayer;
  }

  /** Displays the top four scores (grand champion, 1st, 2nd, 3rd)
   * @param {object} topFour - The top four scores, w/ attached player ID's
   */

  function topScores(topFour) {
    // Going to be responsible for displaying the top 4 scores for the machine
    // Should this potentially be moved off into it's own component?
    return topFour.map((score, index) => {
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
            borderRadius: "10px",
            paddingTop: "5px",
            fontSize:"14px"
          }}
        >
          <strong>
            {emojis[index]}
            {titles[index]}
            {emojis[index]}
          </strong>
          <div id="top-initials">{playerSearch(player)[1]}</div>
          <div id="score">{playerScore}</div>
        </Grid>
      );
    });
  }

  /** Displays all other high scores submitted by players. Will eventually
   * only display one score per player (their highest recorded)
   * @param {object} scores - All other high scores starting after
   * the third place score
   */

  function moreScores(scores) {
    // Should this potentially be moved off into it's own component?
    if (scores.length > 4) {
      <Grid item xs={6} sx={{ "text-align": "center" }}>
        <Typography
          sx={{
            paddingTop: "10px",
            fontFamily: "monospace",
            fontSize: "15px",
            textDecoration: "underline",
          }}
        >
          Other Scores
        </Typography>
        <div id="other-scores">
          <Table>
            <TableBody>
              <TableRow id="columns">
                <TableCell sx={{ color: "white", textDecoration: "underline" }}>
                  Initials
                </TableCell>
                <TableCell sx={{ color: "white", textDecoration: "underline" }}>
                  Score
                </TableCell>
              </TableRow>
              {/* eslint-disable-next-line */}
              {scores.map((score, index) => {
                if (index >= 4) {
                  //I'd like to start AT 4 here - what can I do?
                  return (
                    <TableRow>
                      <TableCell id="other-initials">
                        {playerSearch(score.player)[1]}
                      </TableCell>
                      <TableCell id="score">{score.score}</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </div>
      </Grid>;
    }
  }
};

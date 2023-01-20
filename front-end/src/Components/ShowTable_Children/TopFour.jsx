import React from "react";
import { Grid } from "@mui/material";

export const TopFour = ({ topFourScores, titles }) => {
  return topFourScores.map((score, index) => {
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
          border: "1px dotted green",
          borderRadius: "10px",
          paddingTop: "5px",
        }}
      >
        <strong>{titles[index]}</strong>
        <div id="top-initials">{playerSearch(player)[1]}</div>
        <div id="score">{playerScore}</div>
      </Grid>
    );
  });
};

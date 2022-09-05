import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";

import "../styles/cards.css";
import axios from "axios";

export const TableCard = ({ table, API }) => {
  const [score, setScore] = React.useState(0);

  const singleTable = (table) => {
    axios
      .get(`${API}/tables/${table.machineid}`)
      .then((res) =>
        res.data.topscores[0]
          ? setScore(res.data.topscores[0])
          : setScore({ score: 0 })
      );
  };

  React.useEffect(() => {
    singleTable(table);
    //console.log(score);
  });

  return (
    <>
      <Card
        sx={{
          maxWidth: 200,
          minWidth: 185,
          backgroundColor: "#262624",
          marginTop: "5px",
        }}
        className="table-card"
      >
        <CardContent>
          <Typography sx={{ fontSize: 20 }}>
            <Link to={`/tables/${table.machineid}`}>{table.name}</Link>
          </Typography>
          <Typography sx={{ mb: 1, fontSize: 12, color: "gold" }}>
            {table.designer !== "designer_placeholder"
              ? table.designer
              : "Designer Unknown"}
            <br />
            {table.manufacturer}, {table.prod_year}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            color="text.secondary"
          ></Typography>
          <Typography sx={{ fontSize: 10, color: "antiquewhite" }}>
            Players: {table.players} | Balls: {table.balls}
          </Typography>
          <Typography
            sx={{ fontSize: 14, color: "white", fontFamily: "squad" }}
          >
            High Score : {score.score}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

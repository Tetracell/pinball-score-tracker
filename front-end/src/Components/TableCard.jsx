import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";

import "../styles/cards.css";
import axios from "axios";

export const TableCard = ({ table, API }) => {
  const [hiScore, setHiScore] = React.useState(0);
  const [player, setPlayer] = React.useState("");

  const singleTable = (table) => {
    axios
      .get(`${API}/tables/${table.machineid}`)
      .then((res) =>
        // res.data.topscores[0]
        //   ? setScore(res.data.topscores[0])
        //   : setScore({ score: 0 })
        tableData(res.data)
      );
  };

  const playerData = (table) => {
    axios
        .get(`${API}/players/${table.player}`)
        .then((res) =>
          setPlayer(res.data.payload.initials)
        )
  }

  const tableData = (table) => {
    if (table.topscores[0]) {
      setHiScore(table.topscores[0])
      playerData(table.topscores[0])
    } else {
      setPlayer("PLACE")
      setHiScore({score:"HOLDER"})
    }
  }  

  React.useEffect(() => {
    singleTable(table);
  }, []);

  return (
    <>
      <Card
        sx={{
          maxWidth: 300,
          minWidth: 300,
          backgroundColor: "#262624",
          marginTop: "5px",
        }}
        className="table-card"
      >
        <CardContent>
          <Typography sx={{ fontSize: 40, fontFamily: "squad" }}>
            <Link to={`/tables/${table.machineid}`}>{table.name}</Link>
          </Typography>
          <Typography sx={{ mb: 1, fontSize: 20, color: "gold" }}>
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
          <Typography sx={{ fontSize: 15, color: "antiquewhite" }}>
            Players: {table.players} | Balls: {table.balls}
          </Typography>
          <Typography id="scorefield">
            High Score : <br/>{player} - {hiScore.score}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

//Former card score color : "#ff00e8"

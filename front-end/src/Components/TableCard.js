import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import "../styles/cards.css";

export const TableCard = ({ table }) => {
  return (
    <>
      <Card sx={{ maxWidth: 200, minWidth: 185 }} className="table-card">
        <CardContent>
          <Typography sx={{ fontSize: 16 }}>
            <Link to={`/tables/${table.machineid}`}>{table.name}</Link>
          </Typography>
          <Typography sx={{ mb: 1, fontSize: 12 }}>
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
          <Typography sx={{ fontSize: 10 }}>
            Players: {table.players} | Balls: {table.balls}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

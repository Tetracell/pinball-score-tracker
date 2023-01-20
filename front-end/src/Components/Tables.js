import React from "react";
import axios from "axios";
import { TableCard } from "./TableCard";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import "../styles/alltables.css";

export const Tables = ({ API }) => {
  const [tables, setTables] = React.useState([{}]);

  React.useEffect(() => {
    axios.get(`${API}/tables`).then((res) => {
      setTables(res.data.payload);
    });
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        {tables.map((table) => {
          return (
            <Grid item xl={2} s={5}>
              <div key={table.machineid} id="card">
                <TableCard table={table} API={API} />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

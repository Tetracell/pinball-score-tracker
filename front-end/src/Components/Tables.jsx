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
  }, [API]);

  return (
    <Box>
      <Grid container spacing={1}>
        {tables.map((table) => {
          return (
            <Grid item xl={'auto'} s={'auto'}>
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

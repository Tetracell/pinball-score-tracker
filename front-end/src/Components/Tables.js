import React from "react";
import axios from "axios";
import { TableCard } from "./TableCard";

export const Tables = ({ API }) => {
  const [tables, setTables] = React.useState([{}]);
  const [scores, setScores] = React.useState([{}]);
  const [players, setPlayer] = React.useState([{}]);
  React.useEffect(() => {
    axios.get(`${API}/tables`).then((res) => {
      setTables(res.data.payload);
    });
    axios.get(`${API}/scores`).then((res) => {});
  }, [tables, API]);
  return (
    <div id="all-tables">
      {tables.map((table) => {
        return (
          <div key={table.machineid}>
            <TableCard table={table} />
          </div>
        );
      })}
    </div>
  );
};

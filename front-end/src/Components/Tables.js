import React from "react";
import axios from "axios";
import { TableCard } from "./TableCard";

export const Tables = ({ API }) => {
  const [tables, setTables] = React.useState([{}]);

  React.useEffect(() => {
    axios.get(`${API}/tables`).then((res) => {
      setTables(res.data.payload);
    });
  }, [tables, API]);

  return (
    <div id="all-tables">
      {tables.map((table) => {
        return (
          <div key={table.machineid}>
            <TableCard table={table} API={API} />
          </div>
        );
      })}
    </div>
  );
};

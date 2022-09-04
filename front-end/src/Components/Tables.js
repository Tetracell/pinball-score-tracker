import React from "react";
import axios from "axios";

export const Tables = ({ API }) => {
  const [tables, setTables] = React.useState([]);
  React.useEffect(() => {
    axios.get(`${API}/tables`).then((res) => {
      setTables(res.data.payload);
    });
  }, [tables, API]);
  return (
    <div id="all-tables">
      The master list of tables. Cards, or card-like things that will show a
      table, year, manuf, and the top 4 scores
      {tables.map((table) => {
        return (
          <>
            <br></br>
            {table.name}<br></br>
          </>
        )
      })}
    </div>
  );
};

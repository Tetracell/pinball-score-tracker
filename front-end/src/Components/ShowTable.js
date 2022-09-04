import React from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

export const ShowTable = ({ API }) => {
  const navigate = useNavigate();
  const [table, setTable] = React.useState({
    name: "",
    manufacturer: "",
    prod_year: 0,
    type: "",
    designer: "",
    players: 0,
    balls: 0,
  });
  const [topFour, setTopFour] = React.useState({});
  const { machineid } = useParams();
  React.useEffect(() => {
    axios.get(`${API}/tables/${machineid}`).then((res) => {
      setTable(res.data.payload);
      
      console.log(res);
    });
  }, []);
  return <></>;
};

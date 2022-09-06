import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export const Players = ({ API }) => {
  console.log(API);
  const [players, setPlayers] = React.useState([{}]);

  React.useEffect(() => {
    axios.get(`${API}/players`).then((res) => {
      setPlayers(res.data.payload);
    });
  }, []);

  return (
    <div>
      {players.map((player) => {
        const playerUrl = "/players/" + player.playerid;
        return (
          <div>
            <Link to={playerUrl}>{player.initials}</Link>-
            {player.name}
          </div>
        );
      })}
    </div>
  );
};

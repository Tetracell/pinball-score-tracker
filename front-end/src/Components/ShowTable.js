import React from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import "../fonts/pinball-data.pinball.ttf";
import "../styles/highscores.css"

export const ShowTable = ({ API }) => {
  //const navigate = useNavigate();
  const titles = ["Grand Champion", "Score #1", "Score #2", "Score #3"];
  const [table, setTable] = React.useState({
    name: "",
    manufacturer: "",
    prod_year: 0,
    type: "",
    designer: "",
    players: 0,
    balls: 0,
  });
  const [topFour, setTopFour] = React.useState([
    {
      scoreid: null,
      score: null,
      date: null,
      witness: null,
      player: null,
      machine: null,
    },
  ]);
  const [players, setPlayers] = React.useState([{}]);
  const [scores, setScores] = React.useState([{}]);
  const { machineid } = useParams();

  React.useEffect(() => {
    axios.get(`${API}/tables/${machineid}`).then((res) => {
      setTable(res.data.payload);
      setTopFour(res.data.topscores);
      setScores(res.data.scores);
    });
    axios.get(`${API}/players`).then((res) => {
      setPlayers(res.data.payload);
    });
  }, [API, machineid]);

  const playerSearch = (id) => {
    let foundPlayer = [];
    players.forEach((player) => {
      if (player.playerid === id) {
        foundPlayer.push(player.name);
        foundPlayer.push(player.initials);
      }
    });
    return foundPlayer;
  };

  return (
    <>
      {table.name} - {table.manufacturer}, {table.prod_year}
      <p>
        <strong>TOP SCORES</strong>
      </p>
      {topFour.map((score, index) => {
        const player = score.player;
        return (
          <div>
            <p>
              <strong>{titles[index]}</strong> : {score.score} -{" "}
              {playerSearch(player)[0]}{" "}
              <initials>{playerSearch(player)[1]}</initials>
            </p>
          </div>
        );
      })}
      <p>ALL OTHER SCORES</p>
      {scores.map((score, index) =>
        index > 4 ? (
          <p>
            {score.score} - {playerSearch(score.player)[0]} {" "} <initials>{playerSearch(score.player)[1]}</initials>
          </p>
        ) : null
      )}
    </>
  );
};

import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <h1>I AM THE NAVBAR! KNEEL BEFORE ME AND WEEP</h1>
      <Link to="/">Home</Link>
      <Link to="/tables">Tables</Link>
      <Link to="/players">Players</Link>
    </>
  );
};

import React from "react";
import { useParams } from "react-router-dom";

function Registered() {
  const { teamID } = useParams();

  return <div className="container">El team ID de tu equipo es: {teamID}</div>;
}

export default Registered;

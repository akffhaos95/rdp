import React, { useEffect, useState } from "react";

import Capsule from "./Capsule";
import { styled } from "@mui/system";

const StatContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const Label = styled("span")(({ scale }) => ({
  position: "relative",
  width: "22%",
  fontFamily: "CookieRun Regular",
  color: "#fff",
  margin: "0.3%",
  fontSize: `${scale / 2.2}px`,
}));

const ScoreLabel = styled("span")(({ scale }) => ({
  position: "relative",
  marginLeft: "1%",
  width: "1%",
  fontFamily: "CookieRun Regular",
  color: "#fff",
  fontSize: `${scale / 2.5}px`,
}));

const Stat = ({ label, width, scale, color }) => {
  return (
    <StatContainer>
      <Label scale={scale}>{label}</Label>
      <Capsule score={width} scale={scale} color={color} />
      <ScoreLabel scale={scale}>{width}</ScoreLabel>
    </StatContainer>
  );
};

export default Stat;

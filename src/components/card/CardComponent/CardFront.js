import Box from "@mui/material/Box";
import CardTemplate from "./CardTemplate";
import Name from "./Name";
import Number from "./Number";
import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const CardFront = ({ card, scale }) => {
  return (
    <CardTemplate scale={scale}>
      <Number number={card.number} scale={scale} />
      <Name name={card.name} scale={scale} />
    </CardTemplate>
  );
};

export default CardFront;

import Box from "@mui/material/Box";
import CardTemplate from "./CardTemplate";
import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  padding: "16px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  position: "relative",
});

const CardFront = ({ card, scale }) => {
  return <CardTemplate scale={scale}></CardTemplate>;
};

export default CardFront;

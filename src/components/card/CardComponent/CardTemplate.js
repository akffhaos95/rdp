import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";

const CardTemplate = ({ number, scale, children }) => {
  const CardContainer = styled(Card)({
    position: "relative",
    width: `${10.5 * scale}px`, // 1050px at scale 100
    height: `${16.29 * scale}px`, // 1629px at scale 100
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: `${0.45 * scale}px`,
    backgroundColor: "#000000",
    backgroundSize: "cover",
  });

  return (
    <CardContainer>
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

export default CardTemplate;

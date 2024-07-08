import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { styled } from "@mui/system";

const CardTemplate = ({ scale, children }) => {
  const CardContainer = styled(Card)({
    position: "relative",
    width: `${10.5 * scale}px`, // 1050px at scale 100
    height: `${16.29 * scale}px`, // 1629px at scale 100
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: `${0.45 * scale}px`,
    background: "#FFFFFF",
    transition: "width 0.2s, height 0.2s",
  });
  return (
    <CardContainer>
      <CardContent style={{ padding: "0px 48px 48px 48px" }}>
        {children}
      </CardContent>
    </CardContainer>
  );
};

export default CardTemplate;

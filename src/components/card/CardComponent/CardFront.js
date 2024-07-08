import Box from "@mui/material/Box";
import CardTemplate from "./CardTemplate";
import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const PlayerImageContainer = styled(Box)({
  position: "relative",
  width: "80%",
  height: "auto",
  margin: "16px 0",
});

const PaintEffect = styled("div")({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: "-1",
  "&::before": {
    content: '""',
    display: "block",
    width: "100%",
    height: "100%",
    background: `url('${process.env.PUBLIC_URL}/paint-splash.svg') no-repeat center center`,
    backgroundSize: "cover",
  },
});

const PlayerImage = styled("img")({
  width: "100%",
  height: "auto",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
});

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

const PlayerName = styled(Typography)({
  color: "#283759",
  fontSize: "24px",
  fontWeight: "bold",
  marginTop: "8px",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
});

const PlayerInfo = styled(Typography)({
  color: "#283759",
  fontSize: "18px",
  marginTop: "4px",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
});

const TeamName = styled(Typography)({
  color: "#ffffff",
  fontSize: "16px",
  position: "absolute",
  top: "8px",
  left: "16px",
  backgroundColor: "#283759",
  padding: "4px 8px",
  borderRadius: "4px",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
});

const CardFront = ({ card, scale }) => {
  return (
    <CardTemplate scale={scale}>
      <Container>
        <TeamName>Rascal</TeamName>
        <PlayerImageContainer>
          <PaintEffect />
          <PlayerImage src={`${process.env.PUBLIC_URL}/${card.name}.png`} />
        </PlayerImageContainer>
        <PlayerName>KIM MIN SEOK</PlayerName>
        <PlayerInfo>#10 | Position: Pitcher</PlayerInfo>
      </Container>
    </CardTemplate>
  );
};

export default CardFront;

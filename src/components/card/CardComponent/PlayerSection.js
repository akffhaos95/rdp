import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import { styled } from "@mui/system";

// 선수 리스트 버튼 -> json 선수 개수만큼
// 각 버튼 클릭 -> 선수 데이터로 useState 변경

const PlayerButton = styled(Button)({
  color: "#FFFFFF",
  background: "linear-gradient(45deg, #B8860B, #DAA520)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.25)",
  height: 25,
  padding: "10px 15px",
  margin: "5px",
});

const PlayerSection = ({ playerList, setPlayer }) => {
  const changePlayer = ({ player }) => {
    setPlayer(player);
    console.log(player);
  };

  return (
    <Grid container spacing={2} margin="30px">
      {playerList.map((player) => (
        <PlayerButton onClick={() => changePlayer({ player })}>
          {player["이름"]}
        </PlayerButton>
      ))}
    </Grid>
  );
};

export default PlayerSection;

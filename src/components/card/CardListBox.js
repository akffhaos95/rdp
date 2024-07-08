import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import { Slider } from "@mui/material";
import { styled } from "@mui/system";

// 선수 리스트 버튼 -> json 선수 개수만큼
// 각 버튼 클릭 -> 선수 데이터로 useState 변경

const CardListDiv = styled("div")({
  justifyContent: "center",
});

const CardButton = styled(Button)({
  color: "#FFFFFF",
  background: "linear-gradient(45deg, #B8860B, #DAA520)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.25)",
  color: "white",
  height: 25,
  padding: "10px 15px",
  margin: "5px",
});

const CardListBox = ({ cardList, setCard, scale, handleScaleChange }) => {
  const changeCard = ({ card }) => {
    setCard(card);
  };

  return (
    <CardListDiv>
      <Slider
        value={scale}
        onChange={handleScaleChange}
        aria-labelledby="scale-slider"
        min={20}
        max={100}
        style={{ width: "300px", margin: "20px auto" }}
      />
      <Grid container spacing={2} margin="30px">
        {cardList.map((card) => (
          <CardButton onClick={() => changeCard({ card })}>
            {card["name"]}
          </CardButton>
        ))}
      </Grid>
    </CardListDiv>
  );
};

export default CardListBox;

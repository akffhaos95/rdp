import { FormControlLabel, Slider, Switch } from "@mui/material";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import { styled } from "@mui/system";

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

const CardListBox = ({
  cardList,
  setCard,
  scale,
  handleScaleChange,
  isEdit,
  setIsEdit,
}) => {
  const changeCard = ({ card }) => {
    setCard(card);
  };

  const handleEditToggle = () => {
    setIsEdit(!isEdit);
  };

  return (
    <CardListDiv>
      <FormControlLabel
        control={<Switch checked={isEdit} onChange={handleEditToggle} />}
        label="수정"
      />
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
          <CardButton key={card.name} onClick={() => changeCard({ card })}>
            {card.name}
          </CardButton>
        ))}
      </Grid>
    </CardListDiv>
  );
};

export default CardListBox;

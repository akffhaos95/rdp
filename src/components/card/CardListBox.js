import { FormControlLabel, Slider, Switch } from "@mui/material";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import theme from "../../style/Theme";

const CardListDiv = styled("div")({
  justifyContent: "center",
  display: "flex",
  width: "fit-content",
  margin: "20px auto",
  padding: "5px 10px 30px 10px",
  borderRadius: "10px",
  background: theme.bg,
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
      <Grid container style={{ alignItems: "center" }}>
        <Grid
          spacing={2}
          item
          xs={12}
          sm={12}
          md={12}
          justifyContent="center" // 수평 방향 중앙 정렬
          alignItems="center" // 수직 방향 중앙 정렬
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 100,
          }}
        >
          <Slider
            value={scale}
            onChange={handleScaleChange}
            aria-labelledby="scale-slider"
            min={20}
            max={100}
            style={{ width: "250px" }}
          />
        </Grid>
        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          spacing={2}
          style={{
            margin: "auto",
          }}
        >
          {cardList.map((card) => (
            <>
              <CardButton key={card.name} onClick={() => changeCard({ card })}>
                {card.name}
              </CardButton>
            </>
          ))}
        </Grid>
      </Grid>
    </CardListDiv>
  );
};

export default CardListBox;

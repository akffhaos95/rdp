/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CardBack from "./CardComponent/CardBack";
import CardFront from "./CardComponent/CardFront";
import { styled } from "@mui/system";

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  // alignItems: "center",
  height: "100%",
  margin: "30px",
  padding: "30px 0px 150px 30px",
  //   background: "#283759",
  flexWrap: "wrap",
});

const CardBox = ({ card, scale, tab }) => {
  if (card === null) return null;

  return (
    <Container>
      <>
        {tab !== "2" ? <CardFront card={card} scale={scale} /> : ""}
        {tab !== "3" ? <CardBack card={card} scale={scale} /> : ""}
      </>
    </Container>
  );
};

export default CardBox;

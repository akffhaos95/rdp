import CardBack from "./CardComponent/CardBack";
import CardFront from "./CardComponent/CardFront";
import CommentEditor from "./CardComponent/CommentEditor";
import React from "react";
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

const CardBox = ({ card, setCard, isEdit, scale }) => {
  if (card === null) return null;

  return (
    <Container>
      <>
        <CardFront card={card} scale={scale} />
        <CardBack card={card} scale={scale} />
      </>
    </Container>
  );
};

export default CardBox;

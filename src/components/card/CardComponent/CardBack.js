import Card from "@mui/material/Card";
import CardTemplate from "./CardTemplate";
import Comment from "./Comment";
import Guage from "./Guage";
import Position from "./Position";
import QRCodeBox from "./QRCodeBox";
import StatContainer from "./StatContainer";
import Title from "./Title";
import { styled } from "@mui/system";

const CardBack = ({ card, scale }) => {
  return (
    <CardTemplate scale={scale}>
      <Title title={"가나다라마바사아자차카타파"} scale={scale} />
      <StatContainer scale={scale} />
      <Comment comments={card.comments} scale={scale} />
    </CardTemplate>
  );
};

export default CardBack;

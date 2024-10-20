import CardTemplate from "./CardTemplate";
import { CircularProgress } from "@mui/material";
import Comment from "./Comment";
import StatContainer from "./StatContainer";
import Title from "./Title";
import Variable from "./Variable";
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

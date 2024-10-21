import CardTemplate from "./CardTemplate";
import { CircularProgress } from "@mui/material";
import Comment from "./Comment";
import StatContainer from "./StatContainer";
import Title from "./Title";
import Variable from "./Variable";
import { styled } from "@mui/system";

const CardBack = ({ card, scale }) => {
  const Image = styled("img")({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "auto",
    zIndex: 0,
  });

  return (
    <CardTemplate scale={scale}>
      {/* <Image src={`${process.env.PUBLIC_URL}/backgroundFront/back.png`} />; */}
      <Title title={"가나다라마바사아자차카타파"} scale={scale} />
      <StatContainer scale={scale} />
      <Comment comments={card.comments} scale={scale} />
    </CardTemplate>
  );
};

export default CardBack;

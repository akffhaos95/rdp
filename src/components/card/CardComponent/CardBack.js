import Card from "@mui/material/Card";
import Comment from "./Comment";
import Guage from "./Guage";
import Position from "./Position";
import QRCodeBox from "./QRCodeBox";
import StatContainer from "./StatContainer";
import Title from "./Title";
import { styled } from "@mui/system";

const CardBack = ({ card, scale }) => {
  const backgroundImage = `${process.env.PUBLIC_URL}/backgroundFront/front_${card.number % 5}.png`;

  const CardContainer = styled(Card)({
    position: "relative",
    width: `${10.5 * scale}px`, // 1050px at scale 100
    height: `${16.29 * scale}px`, // 1629px at scale 100
    flexDirection: "column",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
    margin: `${0.45 * scale}px`,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    transition: "width 0.2s, height 0.2s",
    paddingTop: "3%",
    paddingBottom: "3%",
    // animation: `${move} 5s linear infinite, ${bounce} 2s ease infinite`,
  });

  const DivContainer = styled("div")({
    position: "relative",
    width: `92%`,
    height: `17%`,
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
  });
  return (
    <div id="back">
      <CardContainer>
        <Title title={"여기에 타이틀"} scale={scale} />
        <DivContainer>
          <QRCodeBox
            url={"https://www.youtube.com/watch?v=r4Kq29FNE-0&t=897s"}
            scale={scale}
          />
          <Guage scale={scale} />
          <Position positionsArray={["p", "c", "1b", "2b"]} scale={scale} />
        </DivContainer>

        <StatContainer scale={scale} />
        <Comment comments={card.comments} scale={scale} />
      </CardContainer>
    </div>
  );
};

export default CardBack;

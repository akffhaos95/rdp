import CardTemplate from "./CardTemplate";
import ChipStack from "./Chip";
import Name from "./Name";
import Number from "./Number";
import Photo from "./Photo";
import Position from "./Position";
import VerticalTextContainer from "./VerticalTextContainer";
import styled from "styled-components";

const CardFront = ({ card, scale }) => {
  const Image = styled("img")({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "auto",
    zIndex: 3,
  });

  return (
    <CardTemplate number={card.number} scale={scale}>
      <Image src={`${process.env.PUBLIC_URL}/backgroundFront/front.png`} />;
      <Number number={card.number} scale={scale} />
      <Name name={card.name} scale={scale} />
      <div>tmptmp</div>
      <Photo name={card.name} scale={scale} />
      <ChipStack scale={scale} />
    </CardTemplate>
  );
};

export default CardFront;

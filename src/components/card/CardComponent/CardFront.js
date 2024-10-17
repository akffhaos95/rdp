import CardTemplate from "./CardTemplate";
import ChipStack from "./Chip";
import Name from "./Name";
import Number from "./Number";
import Photo from "./Photo";
import Position from "./Position";
import VerticalTextContainer from "./VerticalTextContainer";

const CardFront = ({ card, scale }) => {
  return (
    <CardTemplate number={card.number} scale={scale}>
      <VerticalTextContainer words={["Hello", "World", "React"]} scale={2} />

      <Number number={card.number} scale={scale} />
      <Name name={card.name} scale={scale} />
      <Photo name={card.name} scale={scale} />
      <ChipStack scale={scale} />
    </CardTemplate>
  );
};

export default CardFront;

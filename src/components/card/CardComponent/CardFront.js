import CardTemplate from "./CardTemplate";
import Name from "./Name";
import Number from "./Number";
import Photo from "./Photo";
import Position from "./Position";
import ChipStack from "./Chip";
const CardFront = ({ card, scale }) => {
  return (
    <CardTemplate number={card.number} scale={scale}>
      <Number number={card.number} scale={scale} />
      <Name name={card.name} scale={scale} />
      <Photo name={card.name} scale={scale} />
      <ChipStack scale={scale} />
    </CardTemplate>
  );
};

export default CardFront;

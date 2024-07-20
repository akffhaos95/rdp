import CardTemplate from "./CardTemplate";
import Comment from "./Comment";
import StatContainer from "./StatContainer";

const CardBack = ({ card, scale }) => {
  console.log("back");
  console.log(card);

  return (
    <div id="back">
      <CardTemplate number={card.number} scale={scale}>
        <Comment comments={card.comments} scale={scale} />
        <StatContainer scale={scale} />
      </CardTemplate>
    </div>
  );
};

export default CardBack;

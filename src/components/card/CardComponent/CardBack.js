import CardTemplate from "./CardTemplate";
import Comment from "./Comment";

const CardBack = ({ card, scale }) => {
  console.log("back");
  console.log(card);

  return (
    <div id="back">
      <CardTemplate number={card.number} scale={scale}>
        <Comment comments={card.comments} scale={scale} />
      </CardTemplate>
    </div>
  );
};

export default CardBack;

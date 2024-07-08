import CardTemplate from "./CardTemplate";

const CardBack = ({ card, scale }) => {
  console.log("back");
  console.log(card);

  return (
    <div id="back">
      <CardTemplate scale={scale}></CardTemplate>
    </div>
  );
};

export default CardBack;

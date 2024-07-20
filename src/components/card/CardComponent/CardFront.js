import CardTemplate from "./CardTemplate";
import Name from "./Name";
import Number from "./Number";
import Photo from "./Photo";
import Position from "./Position";
import React from "react";
import StatContainer from "./StatContainer";

const CardFront = ({ card, scale }) => {
  return (
    <CardTemplate number={card.number} scale={scale}>
      <Number number={card.number} scale={scale} />
      <Name name={card.name} scale={scale} />
      <StatContainer scale={scale} />
      <Position
        positionsArray={["p", "c", "1b", "2b", "3b", "ss", "lf", "cf", "rf"]}
        scale={scale}
      />
      <Photo name={card.name} scale={scale} />
    </CardTemplate>
  );
};

export default CardFront;

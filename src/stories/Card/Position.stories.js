import Position from "../../components/card/CardComponent/Position";
import React from "react";

export default {
  title: "Position",
  component: Position,
};

const Template = (args) => <Position {...args} />;

export const Default = Template.bind({});
Default.args = {
  positionsArray: [
    "pitcher",
    "catcher",
    "firstBase",
    "secondBase",
    "thirdBase",
    "shortstop",
    "leftField",
    "centerField",
    "rightField",
  ],
};

export const CustomPositions = Template.bind({});
CustomPositions.args = {
  positionsArray: ["pitcher", "shortstop", "centerField"],
};

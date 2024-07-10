import React from "react";
import StatContainer from "../../components/card/CardComponent/StatContainer";

export default {
  title: "Components/StatContainer",
  component: StatContainer,
};

const Template = (args) => <StatContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  scale: 20,
};

export const Batter = Template.bind({});
Batter.args = {
  scale: 20,
};

export const Pitcher = Template.bind({});
Pitcher.args = {
  scale: 20,
};

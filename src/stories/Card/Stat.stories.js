import React from "react";
import Stat from "../../components/card/CardComponent/Stat";

export default {
  title: "Components/Stat",
  component: Stat,
};

const Template = (args) => <Stat {...args} />;

export const Default = Template.bind({});
Default.args = {
  index: 0,
};

export const Second = Template.bind({});
Second.args = {
  index: 1,
};

export const Third = Template.bind({});
Third.args = {
  index: 2,
};

export const Fourth = Template.bind({});
Fourth.args = {
  index: 3,
};

export const Fifth = Template.bind({});
Fifth.args = {
  index: 4,
};

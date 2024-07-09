import Number from "../../components/card/CardComponent/Number";
import React from "react";

export default {
  title: "Card/Number",
  component: Number,
};

const Template = (args) => <Number {...args} />;

export const Default = Template.bind({});
Default.args = {
  number: 12,
  scale: 20,
};

export const One = Template.bind({});
One.args = {
  number: 1,
  scale: 20,
};

export const Ten = Template.bind({});
Ten.args = {
  number: 10,
  scale: 20,
};
export const Hundred = Template.bind({});
Hundred.args = {
  number: 100,
  scale: 20,
};

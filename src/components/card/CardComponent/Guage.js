import * as React from "react";

import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

import { styled } from "@mui/system";

const Guage = ({ guage, scale }) => {
  const GuageContainer = styled("div")({
    position: "relative",
    width: `31%`,
    height: `100%`,
    display: "flex",
    backgroundSize: "cover",
    display: "flex",
    marginRight: "2%",
    border: `${scale / 10}px solid #ddd`,
    borderRadius: "5%",
  });

  return (
    <GuageContainer>
      <Gauge
        value={75}
        startAngle={0}
        endAngle={360}
        innerRadius="60%"
        outerRadius="100%"
      />
    </GuageContainer>
  );
};

export default Guage;

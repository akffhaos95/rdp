import React from "react";
import Stat from "./Stat";
import Variable from "./Variable";
import { styled } from "@mui/system";

const Container = styled("div")(({ scale }) => ({
  position: "relative",
  width: "100%",
  height: "auto",
  margin: "4%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "left",
  // backgroundColor: "rgba(0, 0, 255, 0.8)",
  borderRadius: "5%",
  // border: `${scale / 10}px solid transparent`, // 투명한 기본 테두리
}));

const StatContainer = ({ scale }) => {
  const stats = [
    { label: "타석", width: 29 },
    { label: "타율", width: 40 },
    { label: "방어율", width: 70 },
    { label: "피안타율", width: 99 },
    { label: "장타", width: 91 },
    { label: "수비", width: 40 },
    { label: "5글자가능", width: 91 },
  ];

  const vc = 80;
  return (
    <Container scale={scale}>
      {stats.map((stat, index) => (
        <Stat
          key={index}
          label={stat.label}
          width={stat.width}
          scale={scale}
          color={index + 1}
        />
      ))}
    </Container>
  );
};

export default StatContainer;

import React from "react";
import Stat from "./Stat";
import { styled } from "@mui/system";

const Container = styled("div")(({ scale }) => ({
  position: "absolute",
  top: `30%`, // 카드의 위쪽에서 약간 떨어진 위치
  right: `3%`, // 카드의 왼쪽에서 약간 떨어진 위치
  width: `${scale * 3}px`,
  height: "auto",
  border: `${scale / 20}px solid #333`,
  borderRadius: `${10}px`,
  padding: `${scale / 20}px`,
  background: "#2b2628",
  boxShadow: `0 0 ${scale}px #000`,
  fontFamily: "galmuri",
  zIndex: 2,
}));

const colors = {
  타석: { start: "#FF5733", end: "#FFBD33" },
  타율: { start: "#33FF57", end: "#33FFBD" },
  방어율: { start: "#3357FF", end: "#33BDFF" },
  피안타율: { start: "#8E44AD", end: "#9B59B6" },
  장타: { start: "#FFC300", end: "#FF5733" },
  수비: { start: "#DAF7A6", end: "#FFC300" },
  특수문자: { start: "#C70039", end: "#900C3F" },
};

const StatContainer = ({ scale }) => {
  const stats = [
    { label: "타석", width: 40 },
    { label: "타율", width: 20 },
    { label: "방어율", width: 50 },
    { label: "피안타율", width: 90 },
    { label: "장타", width: 10 },
    { label: "수비", width: 120 },
    { label: "특수문자", width: 100 },
  ];

  return (
    <Container scale={scale}>
      {stats.map((stat, index) => (
        <Stat
          key={index}
          label={stat.label}
          width={stat.width}
          scale={scale}
          colors={colors[stat.label]}
        />
      ))}
    </Container>
  );
};

export default StatContainer;

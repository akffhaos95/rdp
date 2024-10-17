import React from "react";
import Stat from "./Stat";
import { styled } from "@mui/system";

const Container = styled("div")(({ scale }) => ({
  position: "relative",
  width: `86%`,
  height: "auto",
  marginLeft: "4%",
  marginRight: "4%",
  marginBottom: "4%",
  padding: "2%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "left",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "5%", // 둥근 테두리
  border: `${scale / 10}px solid transparent`, // 투명한 기본 테두리
  borderImage: `linear-gradient(45deg, #FF5733, #33BDFF) 1`, // 그라데이션으로 테두리 모양 적용
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
    { label: "피안타율", width: 1000 },
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

import React from "react";
import Stat from "./Stat";
import Variable from "./Variable";
import { styled } from "@mui/system";

const RowContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
});

const Container = styled("div")(({ scale }) => ({
  position: "relative",
  flexGrow: 1,
  // width: `10%`,
  height: "auto",
  marginTop: "4%",
  marginBottom: "4%",
  marginLeft: "4%",
  padding: "2%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "left",
  // backgroundColor: "rgba(0, 0, 255, 0.8)",
  borderRadius: "5%",
  // border: `${scale / 10}px solid transparent`, // 투명한 기본 테두리
}));

const VCContainer = styled("div")(({ scale }) => ({
  position: "relative",
  marginTop: "6%",
  flexGrow: 1,
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
    <RowContainer>
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
      <VCContainer>
        <Variable vc={vc} scale={scale} />
        <Variable vc={vc} scale={scale} />
      </VCContainer>
    </RowContainer>
  );
};

export default StatContainer;

import React from "react";
import { styled } from "@mui/system";

const Name = ({ name, scale }) => {
  if (name === null) return null;

  const NameBox = styled("div")({
    position: "absolute",
    top: `3%`,
    right: `3%`,
    color: "white",
    fontSize: `${scale}px`,
    fontFamily: "VITRO CORE",
    margin: `${0.1 * scale}px`,
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  });

  const Line = styled("div")({
    width: `100%`, // 라인의 길이
    height: `${scale / 20}px`, // 라인의 두께
    backgroundColor: "white",
    background: "linear-gradient(to left, #00ff00, #008000)", // 네온 색상의 그라데이션
    marginTop: `${scale / 10}px`, // 텍스트 아래의 간격
  });

  return (
    <NameBox>
      {name}
      <Line />
    </NameBox>
  );
};

export default Name;

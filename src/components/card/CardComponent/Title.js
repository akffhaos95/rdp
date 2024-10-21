import React from "react";
import { styled } from "@mui/system";

const Title = ({ title, scale }) => {
  if (!title) return null;

  const TitleBox = styled("div")({
    position: "relative",
    width: `100%`,
    height: `5%`,
    marginBottom: "7%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    borderBottom: `${scale / 10}px solid #DDD`,
    fontFamily: "Arial, sans-serif", // 기본 폰트
    color: "white",
    fontSize: `${scale / 1.5}px`, // 기본 폰트 크기
    textAlign: "center", // 기본 정렬
  });

  return <TitleBox scale={scale}>{title}</TitleBox>;
};

export default Title;

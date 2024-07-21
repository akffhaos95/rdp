import React from "react";
import { styled } from "@mui/system";

const Title = ({ title, scale }) => {
  if (!title) return null;

  const TitleBox = styled("div")({
    position: "relative",
    width: `86%`,
    height: `5%`,
    marginLeft: "4%",
    marginRight: "4%",
    padding: "2%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    border: `${scale / 10}px solid #ddd`,
    borderRadius: "5%",
    fontFamily: "Arial, sans-serif", // 기본 폰트
    fontSize: `${scale}px`, // 기본 폰트 크기
    textAlign: "center", // 기본 정렬
  });

  return <TitleBox scale={scale}>{title}</TitleBox>;
};

export default Title;

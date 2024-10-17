import React from "react";
import { styled } from "@mui/system";

const Number = ({ number, scale }) => {
  if (number === null) return null;

  const NumberBox = styled("div")({
    position: "absolute",
    top: `1%`, // 카드의 위쪽에서 약간 떨어진 위치
    left: `4%`, // 카드의 왼쪽에서 약간 떨어진 위치
    color: "white",
    fontSize: `${scale * 2}px`, // 폰트 크기를 스케일에 맞게 조정
    fontFamily: "Chakra Petch",
    fontWeight: 700,
    margin: `${0.1 * scale}px`,
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const dotSize = `${scale / 5}px`;
  const Dot = styled("div")({
    position: "absolute",
    width: dotSize,
    height: dotSize,
    backgroundColor: "white",
    borderRadius: "50%",
  });

  return (
    <NumberBox>
      {number}
      {/* <Dot
        style={{
          top: "5%",
          left: "-10%",
          transform: "translateX(-50%)",
        }}
      />
      <Dot
        style={{
          bottom: "5%",
          left: "-10%",
          transform: "translateX(-50%)",
        }}
      />
      <Dot
        style={{
          top: "5%",
          right: "-15%",
        }}
      />
      <Dot
        style={{
          bottom: "5%",
          right: "-15%",
        }}
      /> */}
    </NumberBox>
  );
};

export default Number;

import React, { useEffect, useState } from "react";

import { styled } from "@mui/system";

const MAX_WIDTH = 150; // 최대 길이 설정
const MIN_VALUE = -10; // 최소 값
const MAX_VALUE = 100; // 최대 값

const StatBox = styled("div")(
  ({ startColor, endColor, delay, filledWidth, scale }) => ({
    width: filledWidth,
    background: `linear-gradient(90deg, ${startColor}, ${endColor})`,
    height: `${scale / 3}px`,
    borderRadius: `10px`,
    marginTop: `${scale / 3}px`,
    marginBottom: `${scale / 10}px`,
    marginLeft: `${scale / 3}px`,
    transition: "width 1s ease-in-out",
    boxShadow: `0 0 ${scale / 12}px ${startColor}, 0 0 ${scale / 12}px ${startColor}, 0 0 ${scale / 12}px ${endColor}`,
    opacity: 0,
    transform: "translateX(-100%)",
    animation: `slide-in 1s forwards ease-in-out ${delay}ms`,
    "@keyframes slide-in": {
      to: {
        opacity: 1,
        transform: "translateX(0)",
      },
    },
    transformOrigin: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: `${scale / 3}px`,
    fontWeight: "bold",
    position: "relative",
  }),
);

const LabelBox = styled("div")(({ scale }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: `${scale / 7}px`,
}));

const Label = styled("span")(({ scale }) => ({
  position: "absolute",
  left: "3%",
  fontFamily: "Giants-Inline",
  marginBottom: `${scale / 10}px`, // 속성 이름과 게이지바 사이의 여백 조정
  color: "#fff",
  fontSize: `${scale / 2.8}px`,
}));

const Stat = ({ label, width, scale, colors }) => {
  const [filled, setFilled] = useState(false);
  const delay = 500;
  const normalizedWidth = Math.max(MIN_VALUE, Math.min(width, MAX_VALUE)); // 값이 MIN_VALUE와 MAX_VALUE 사이로 제한됨
  const filledWidth = filled
    ? `${((normalizedWidth - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * scale * 2.5}px`
    : "0px"; // 비율에 따라 길이 계산

  useEffect(() => {
    const timer = setTimeout(() => setFilled(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <LabelBox scale={scale}>
      <StatBox
        startColor={colors.start}
        endColor={colors.end}
        delay={delay}
        filledWidth={filledWidth}
        scale={scale}
      >
        {width}
      </StatBox>
      <Label scale={scale}>{label}</Label>
    </LabelBox>
  );
};

export default Stat;

import React, { useEffect, useState } from "react";

import { styled } from "@mui/system";

const MAX_WIDTH = 80; // 최대 길이 설정
const MIN_VALUE = 0; // 최소 값
const MAX_VALUE = 100; // 최대 값

const StatContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  margin: "1%",
});

const StatBox = styled("div")(
  ({ startColor, endColor, delay, filledWidth, scale }) => ({
    position: "relative",
    width: filledWidth,
    background: `linear-gradient(10deg, ${endColor}, ${startColor})`,
    borderRadius: `10px`,
    marginTop: `0.5%`,
    marginBottom: `0.5%`,
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

const Label = styled("span")(({ scale }) => ({
  position: "relative",
  width: "20%",
  fontFamily: "Giants-Inline",
  // marginBottom: `${scale / 10}px`, // 속성 이름과 게이지바 사이의 여백 조정
  color: "#fff",
  fontSize: `${scale / 2.8}px`,
}));

const Stat = ({ label, width, scale, colors }) => {
  const [filled, setFilled] = useState(false);
  const delay = 500;
  const normalizedWidth = Math.max(MIN_VALUE, Math.min(width, MAX_VALUE));
  const filledWidth = filled
    ? `${((normalizedWidth - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * MAX_WIDTH}%`
    : "0%";

  console.log(filledWidth);
  useEffect(() => {
    const timer = setTimeout(() => setFilled(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <StatContainer>
      <Label scale={scale}>{label}</Label>
      <StatBox
        startColor={colors.start}
        endColor={colors.end}
        delay={delay}
        filledWidth={filledWidth}
        scale={scale}
      >
        {width}
      </StatBox>
    </StatContainer>
  );
};

export default Stat;

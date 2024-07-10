import React from "react";
import { styled } from "@mui/system";

const Field = styled("svg")({
  width: "300px",
  height: "300px",
  position: "relative",
});

const PositionStar = styled("div")(({ top, left }) => ({
  position: "absolute",
  top: `${top}%`,
  left: `${left}%`,
  transform: "translate(-50%, -50%)",
  fontSize: "24px",
  color: "gold",
}));

const positions = {
  pitcher: { top: 50, left: 50 },
  catcher: { top: 71, left: 50 },
  firstBase: { top: 61, left: 61 },
  secondBase: { top: 39, left: 61 },
  thirdBase: { top: 61, left: 39 },
  shortstop: { top: 39, left: 39 },
  leftField: { top: 20, left: 30 },
  centerField: { top: 10, left: 50 },
  rightField: { top: 20, left: 70 },
};

const Position = ({ positionsArray }) => (
  <div style={{ position: "relative", width: "300px", height: "300px" }}>
    <Field viewBox="0 0 100 100">
      <g fill="none" stroke="black" strokeWidth="1">
        {/* 외곽 라인 - 부채꼴 모양 */}
        <path d="M 10,90 L 90,90 L 90,10 A 40,40 0 0 0 10,10 Z" />
        {/* 내야 다이아몬드 */}
        <path d="M 50,80 L 80,50 L 50,20 L 20,50 Z" />
        {/* 홈 플레이트 */}
        <path d="M 47,80 L 53,80 L 53,75 L 50,72 L 47,75 Z" />
        {/* 1루 */}
        <path d="M 75,53 L 80,53 L 80,47 L 75,47 Z" />
        {/* 2루 */}
        <path d="M 53,25 L 53,20 L 47,20 L 47,25 Z" />
        {/* 3루 */}
        <path d="M 25,53 L 20,53 L 20,47 L 25,47 Z" />
        {/* 마운드 */}
        <circle cx="50" cy="50" r="2" />
      </g>
    </Field>
    {positionsArray.map((position, index) => (
      <PositionStar
        key={index}
        top={positions[position].top}
        left={positions[position].left}
      >
        ★
      </PositionStar>
    ))}
  </div>
);

export default Position;

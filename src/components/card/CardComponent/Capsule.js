import React from "react";

const Capsule = ({ score, scale, color }) => {
  const fullCapsules = Math.floor(score / 5);
  const remainingPercentage = score % 5;
  const emptyCapsules =
    remainingPercentage > 0 ? 20 - fullCapsules - 1 : 20 - fullCapsules; // 빈 캡슐 수

  const capsules = [];

  const width = `${scale / 4}px`;
  const height = `${scale / 2}px`;

  for (let i = 0; i < fullCapsules; i++) {
    capsules.push(
      <img
        src={`capsule/${color}.png`}
        alt="Full Capsule"
        width={width}
        height={height}
      />,
    );
  }

  if (remainingPercentage > 0) {
    capsules.push(
      <img src={`capsule/${color}_half.png`} width={width} height={height} />,
    );
  }

  for (let i = 0; i < emptyCapsules; i++) {
    capsules.push(
      <img
        src="capsule/8.png"
        alt="Empty Capsule"
        width={width}
        height={height}
      />,
    );
  }

  return <div style={{ display: "flex", gap: scale / 30 }}>{capsules}</div>;
};

export default Capsule;

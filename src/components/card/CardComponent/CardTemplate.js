import { keyframes, styled } from "@mui/system";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";

const bounce = keyframes`
  0% { transform: translateY(0); }
  20% { transform: translateY(-100px); }
  40% { transform: translateY(0); }
  50% { transform: translateY(-50px); }
  70% { transform: translateY(0); }
  75% { transform: translateY(-25px); }
  90% { transform: translateY(0); }
  92% { transform: translateY(-12.5px); }
  100% { transform: translateY(0); }
`;

// 수평 이동 애니메이션 정의
const move = keyframes`
  0% { left: 100%; }
  100% { left: 0; }
`;

const CardTemplate = ({ number, scale, children }) => {
  const backgroundImage = `${process.env.PUBLIC_URL}/backgroundFront/front_${number % 5}.png`;

  const CardContainer = styled(Card)({
    position: "relative",
    width: `${10.5 * scale}px`, // 1050px at scale 100
    height: `${16.29 * scale}px`, // 1629px at scale 100
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: `${0.45 * scale}px`,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    transition: "width 0.2s, height 0.2s",
    // animation: `${move} 5s linear infinite, ${bounce} 2s ease infinite`,
  });

  return (
    <CardContainer>
      <CardContent style={{ padding: "0px 48px 48px 48px" }}>
        {children}
      </CardContent>
    </CardContainer>
  );
};

export default CardTemplate;

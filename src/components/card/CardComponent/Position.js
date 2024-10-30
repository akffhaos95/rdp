import React from "react";
import { styled } from "@mui/system";

const Position = ({ positionsArray, scale }) => {
  const fieldImage = `${process.env.PUBLIC_URL}/field.png`;

  const PositionContainer = styled("div")({
    position: "relative",
    width: `36%`,
    height: `100%`,
    display: "flex",
    backgroundImage: `url(${fieldImage})`,
    backgroundSize: "cover",

    // border: `${scale / 10}px solid #ddd`,
    borderRadius: "5%",
  });

  const positions = {
    p: { top: 65, left: 47.5 },
    c: { top: 87, left: 47.5 },
    "1b": { top: 65, left: 65 },
    "2b": { top: 50, left: 58.5 },
    "3b": { top: 65, left: 29 },
    ss: { top: 50, left: 34 },
    lf: { top: 30, left: 20 },
    cf: { top: 15, left: 47.5 },
    rf: { top: 30, left: 73 },
  };
  const Marker = styled("div")({
    position: "absolute",
    width: `${0.2 * scale}px`,
    height: `${0.2 * scale}px`,
    backgroundColor: "red",
    borderRadius: "50%",
  });

  return (
    <PositionContainer>
      {positionsArray.map((pos, index) => (
        <Marker
          key={index}
          style={{
            top: `${positions[pos].top}%`,
            left: `${positions[pos].left}%`,
          }}
        />
      ))}
    </PositionContainer>
  );
};

export default Position;

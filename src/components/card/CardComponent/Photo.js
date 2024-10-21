import React from "react";
import { styled } from "@mui/system";

const Photo = ({ name, scale }) => {
  if (name === null) return null;

  const Image = styled("img")({
    position: "absolute",
    top: 0,
    left: 0,
    width: `${10.5 * scale}px`, // 1050px at scale 100
    height: `${16.29 * scale}px`, // 1629px at scale 100
    zIndex: 1,
  });

  return <Image src={`${process.env.PUBLIC_URL}/player/${name}.png`} />;
};

export default Photo;

import React from "react";
import { styled } from "@mui/system";

const Photo = ({ name, scale }) => {
  if (name === null) return null;

  const Image = styled("img")({
    position: "absolute",
    top: 30,
    left: 30,
    width: "80%",
    height: "auto",
    zIndex: 1,
  });

  return (
    <>
      <Image src={`${process.env.PUBLIC_URL}/${name}.png`} />
    </>
  );
};

export default Photo;

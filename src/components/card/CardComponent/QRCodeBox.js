import QRCode from "qrcode.react";
import React from "react";
import { styled } from "@mui/system";

const QRCodeBox = ({ url, scale }) => {
  const QRContainer = styled("div")({
    position: "relative",
    width: `30%`,
    height: `100%`,
    display: "flex",
    backgroundSize: "cover",
    marginLeft: "0%",
    marginRight: "2%",
    alignItems: "center",
    // border: `${scale / 10}px solid #ddd`,
    borderRadius: "5%",
  });

  return (
    <QRContainer>
      <QRCode
        value={url}
        size={scale * 2.7}
        bgColor={"#00ff0000"}
        fgColor={"#9198e5"}
      />
    </QRContainer>
  );
};

export default QRCodeBox;

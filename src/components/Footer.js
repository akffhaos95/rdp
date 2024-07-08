import { Box, Typography } from "@mui/material";

import React from "react";
import { styled } from "@mui/system";

const FooterBox = styled(Box)({
  padding: "10px 0",
  position: "fixed",
  bottom: 0,
  width: "100%",
  zIndex: 50,
});
const Footer = () => {
  return (
    <FooterBox>
      <Typography variant="body2" align="center">
        © 2024 Rascal
      </Typography>
    </FooterBox>
  );
};

export default Footer;

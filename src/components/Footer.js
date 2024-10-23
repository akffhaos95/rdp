import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import theme from "../style/Theme";

const FooterBox = styled(Box)({
  padding: "10px 0",
  position: "fixed",
  bottom: 0,
  width: "100%",
  zIndex: 50,
  border: "1px solid grey",
  background: theme.main,
  color: "white",
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
